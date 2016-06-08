/*
*  This file handles the storage of navigation settings, it also include a way to
*  trigger update
*/
/* eslint-disable quote-props */

import SimpleStore from 'react-native-simple-store';

// Global Actions
import * as DataActions from '../state/actions/data';
import * as UtilActions from '../state/actions/util';
import * as NavActions from '../state/actions/navigation';

// Global Includes
import { Store } from '../global/globalIncludes';

// Envrionment Vars
import Env from '../env/env';


const DiffPatcher = require('jsondiffpatch').create({ cloneDiffValues: false });

const Navigation = {
    fetch: () => {
        SimpleStore.get('navigation').then((navData) => {
            // Dispatch fetched action
            if (navData) {
                Store.appStore.dispatch(DataActions.navigationFetched(navData));
                Store.appStore.dispatch(DataActions.updateNavigation());
            } else {
                // Init the data storage, will call for non patch endpoint
                // https://event.com/update/navigation/raw?appId=XXXXXXX
                // fetch(`${Env.api}/update/navigation/raw`, {
                //     method: 'GET',
                //     body: {
                //         appId: Env.appId
                //     }
                // })
                fetch('https://www.dropbox.com/s/k7y933t3wr1jyu0/navigation.json?raw=1', {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((requestedNavData) => {
                    SimpleStore.save('navigation', requestedNavData).then(() => {
                        Store.appStore.dispatch(NavActions.switchNavigation(requestedNavData.data.config.defaults.initialPage));
                        Store.appStore.dispatch(DataActions.navigationFetched(requestedNavData));
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
        SimpleStore.get('navigation').then((navData) => {
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
                        navData = DiffPatcher.patch(navData, patch);
                    }
                    SimpleStore.save('navigation', navData).then(() => {
                        Store.appStore.dispatch(DataActions.navigationFetched(navData));
                    }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                }
            })
            .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    }
};

module.exports = Navigation;