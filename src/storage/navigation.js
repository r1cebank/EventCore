/*
 *  This file handles the storage of navigation settings, it also include a way to
 *  trigger update
 */
 /* eslint-disable quote-props */

import { AsyncStorage } from 'react-native';

const DiffPatcher = require('jsondiffpatch').DiffPatcher;

class Navigation {
    constructor(config) {
        // Sample config
        // {
        //     api: 'https://xxx.xxx.xx',
        //     appId: 'xxxxxx'
        // }
        this.config = config;
    }
    get() {
        return AsyncStorage.getItem('navigation');
    }
    init() {
        // Init the data storage, will call for non patch endpoint
        // https://event.com/update/navigation/raw?appId=XXXXXXX
        return new Promise((resolve, reject) => {
            fetch('/update/navigation/raw', {
                method: 'GET',
                body: {
                    appId: this.config.appId
                }
            })
            .then((response) => response.json())
            .then((data) => {
                AsyncStorage.setItem('navigation', data).then(() => {
                    resolve({ success: true });
                }).catch((e) => { reject(e); });
            })
            .catch((e) => { reject(e); });
        });
    }
    update() {
        return new Promise((resolve, reject) => {
            // Call endpoint for patches
            // https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1
            // Endpoint should be like: https://event.com/update/navigation/patches?appId=XXXXXX?currentVersion=XX
            AsyncStorage.getItem('navigation').then((navData) => {
                fetch('/update/navigation/patch', {
                    method: 'GET',
                    body: {
                        appId: this.config.appId,
                        currentVersion: navData.version
                    }
                })
                .then((response) => response.json())
                .then((delta) => {
                    DiffPatcher.patch(navData, delta);
                    AsyncStorage.setItem('navigation', navData).then(() => {
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
}

export default Navigation;
