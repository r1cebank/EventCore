/*
*  This file handles the storage of agendas, it also include a way to
*  trigger update
*/
/* eslint-disable quote-props */
import SimpleStore from 'react-native-simple-store';
import _ from 'lodash';

// Global Actions
import * as DataActions from '../state/actions/data';
import * as UtilActions from '../state/actions/util';

// Global Includes
import { Store } from '../global/globalIncludes';

const DiffPatcher = require('jsondiffpatch').create({ cloneDiffValues: false });


function Generic(Storage = SimpleStore) {
    return {
        fetch: (config) => {
            Storage.get(config.storageKey).then((data) => {
                // Dispatch fetched action
                if (data) {
                    if (_.isFunction(config.afterFetch)) {
                        // Run callbacks
                        config.afterFetch(data);
                    }
                    Store.appStore.dispatch(DataActions[config.fetched](config, data));
                    Store.appStore.dispatch(DataActions[config.update](config));
                } else {
                    // Init the data storage, will call for non patch endpoint
                    // https://event.com/update/navigation/raw?appId=XXXXXXX
                    // fetch(`${Env.api}/update/navigation/raw`, {
                    //     method: 'GET',
                    //     body: {
                    //         appId: Env.appId
                    //     }
                    // })
                    fetch(config.rawURL, config.rawURLParams)
                    .then((response) => response.json())
                    .then((requestedData) => {
                        if (_.isFunction(config.afterGet)) {
                            // Run callbacks
                            config.afterGet(requestedData);
                        }
                        Store.appStore.dispatch(DataActions[config.fetched](requestedData));
                        Storage.save(config.storageKey, requestedData).then(() => {
                            if (_.isFunction(config.afterSave)) {
                                // Run callbacks
                                config.afterSave();
                            }
                        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                    })
                    .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                }
            }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
        },
        update: (config) => {
            // Call endpoint for patches
            // https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1
            // Endpoint should be like: https://event.com/update/navigation/patches?appId=XXXXXX?currentVersion=XX
            Storage.get(config.storageKey).then((data) => {
                fetch(config.updateURL, config.updateURLParams)
                // fetch(`${Env.api}/update/navigation/patch`, {
                //     method: 'GET',
                //     body: {
                //         appId: Env.appId,
                //         currentVersion: navData.version
                //     }
                // })
                .then((response) => response.json())
                .then((patches) => {
                    if (_.isFunction(config.beforePatch)) {
                        // Run callbacks
                        config.beforePatch(patches, data);
                    }
                    if (patches.length) {
                        for (const patch of patches) {
                            data = DiffPatcher.patch(data, patch);
                        }
                        Storage.save(config.storageKey, data).then(() => {
                            if (_.isFunction(config.afterPatch)) {
                                // Run callbacks
                                config.afterPatch(patches, data);
                            }
                            Store.appStore.dispatch(DataActions[config.fetched](config, data));
                        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                    }
                })
                .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
            }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
        }
    };
};

module.exports = Generic;
