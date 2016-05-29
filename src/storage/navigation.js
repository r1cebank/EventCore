/*
 *  This file handles the storage of navigation settings, it also include a way to
 *  trigger update
 */
 /* eslint-disable quote-props */

import { AsyncStorage } from 'react-native';

// Global Actions
import * as Actions from '../global/state/actions/actions';

// Global Includes
import { Store } from '../global/global-includes';


const DiffPatcher = require('jsondiffpatch').DiffPatcher;

const Navigation = {
    fetch: (config) => {
        AsyncStorage.getItem('navigation').then((navData) => {
            // Dispatch fetched action
            if (navData) {
                Store.appStore.dispatch(Actions.navigationFetched(JSON.parse(navData)));
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
                .then((data) => {
                    AsyncStorage.setItem('navigation', JSON.stringify(data)).then(() => {
                        Store.appStore.dispatch(Actions.navigationFetched(navData));
                    }).catch((e) => { /* Dispatch error */ });
                })
                .catch((e) => { /* Dispatch error */ });
            }
        });
    },
    update: (config) => {
        return new Promise((resolve, reject) => {
            // Call endpoint for patches
            // https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1
            // Endpoint should be like: https://event.com/update/navigation/patches?appId=XXXXXX?currentVersion=XX
            AsyncStorage.getItem('navigation').then((navData) => {
                navData = JSON.parse(navData);
                fetch('https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1', {
                    method: 'GET',
                    body: {
                        appId: this.config.appId,
                        currentVersion: navData.version
                    }
                })
                // fetch(`${this.config.api}/update/navigation/patch`, {
                //     method: 'GET',
                //     body: {
                //         appId: this.config.appId,
                //         currentVersion: navData.version
                //     }
                // })
                .then((response) => response.json())
                .then((delta) => {
                    DiffPatcher.patch(navData, delta);
                    AsyncStorage.setItem('navigation', JSON.stringify(navData)).then(() => {
                        resolve({ success: true });
                    }).catch((e) => { reject(e); });
                })
                .catch((e) => { reject(e); });
            }).catch((e) => { reject(e); });
            // Apply patches
            // {
            //     "data": {
            //         "pages": {
            //             "0": {
            //                 "view": [
            //                     "card1",
            //                     "card"
            //                 ]
            //             },
            //             "_t": "a"
            //         }
            //     }
            // }

            // DiffPatcher.patch(country, delta);


            // Update store
            // AsyncStorage.setItem('navigation', value);

            // Resolve
        });
    }
};

module.exports = Navigation;
