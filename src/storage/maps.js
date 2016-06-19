/*
*  This file handles the storage of maps, it also include a way to
*  trigger update
*/
/* eslint-disable quote-props */

import SimpleStore from 'react-native-simple-store';

// Global Actions
import * as DataActions from '../state/actions/data';
import * as UtilActions from '../state/actions/util';

// Global Includes
import { Store } from '../global/globalIncludes';

// Envrionment Vars
// import Env from '../env/env';


const DiffPatcher = require('jsondiffpatch').create({ cloneDiffValues: false });

const Maps = {
    fetch: () => {
        SimpleStore.get('maps').then((mapsData) => {
            // Dispatch fetched action
            if (mapsData) {
                Store.appStore.dispatch(DataActions.mapsFetched(mapsData));
                Store.appStore.dispatch(DataActions.updateMaps());
            } else {
                // Init the data storage, will call for non patch endpoint
                // https://event.com/update/navigation/raw?appId=XXXXXXX
                // fetch(`${Env.api}/update/navigation/raw`, {
                //     method: 'GET',
                //     body: {
                //         appId: Env.appId
                //     }
                // })
                fetch('https://www.dropbox.com/s/vq2rxyqn7lxfw8y/maps.json?raw=1', {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((requestedMapsData) => {
                    SimpleStore.save('maps', requestedMapsData).then(() => {
                        Store.appStore.dispatch(DataActions.mapsFetched(requestedMapsData));
                    }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                })
                .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
            }
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    },
    update: () => {
        // Call endpoint for patches
        // https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1
        // Endpoint should be like: https://event.com/update/navigation/patches?appId=XXXXXX?currentVersion=XX
        SimpleStore.get('maps').then((mapsData) => {
            fetch('https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1', {
                method: 'GET'
            })
            // fetch(`${Env.api}/update/navigation/patch`, {
            //     method: 'GET',
            //     body: {
            //         appId: Env.appId,
            //         currentVersion: navData.version
            //     }
            // })
            .then((response) => response.json())
            .then((patches) => {
                if (patches.length) {
                    for (const patch of patches) {
                        mapsData = DiffPatcher.patch(mapsData, patch);
                    }
                    SimpleStore.save('maps', mapsData).then(() => {
                        Store.appStore.dispatch(DataActions.mapsFetched(mapsData));
                    }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                }
            })
            .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    }
};

module.exports = Maps;
