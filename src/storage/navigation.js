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
import { Store } from '../global/global-includes';


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
                // fetch(`${this.config.api}/update/navigation/raw`, {
                //     method: 'GET',
                //     body: {
                //         appId: this.config.appId
                //     }
                // })
                fetch('https://www.dropbox.com/s/k7y933t3wr1jyu0/navigation.json?raw=1', {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((navData) => {
                    SimpleStore.save('navigation', navData).then(() => {
                        Store.appStore.dispatch(DataActions.navigationFetched(navData));
                        Store.appStore.dispatch(NavActions.switchNavigation(navData.data.config.defaults.initialPage));
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
            // fetch(`${this.config.api}/update/navigation/patch`, {
            //     method: 'GET',
            //     body: {
            //         appId: this.config.appId,
            //         currentVersion: navData.version
            //     }
            // })
            .then((response) => response.json())
            .then((patches) => {
                for (const patch of patches) {
                    navData = DiffPatcher.patch(navData, patch);
                }
                SimpleStore.save('navigation', navData).then(() => {
                    Store.appStore.dispatch(DataActions.navigationFetched(navData));
                    Store.appStore.dispatch(NavActions.switchNavigation(navData.data.config.defaults.initialPage));
                }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
            })
            .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    }
};

module.exports = Navigation;
