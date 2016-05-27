/*
 *  This file handles the storage of navigation settings, it also include a way to
 *  trigger update
 */

import { AsyncStorage } from 'react-native';
import Frisbee from 'frisbee';


var DiffPatcher = require('jsondiffpatch').DiffPatcher;

class Navigation {
    constructor(config) {
        this.config = config;
    }
    get() {
        return AsyncStorage.getItem('navigation');
    }
    init() {
        // Init the data storage, will call for non patch endpoint
        // https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1
    }
    update() {
        return Promise((resolve, reject) => {
            // Call endpoint for patches
            // Endpoint should be like: https://event.com/update/navigation/patches?appId=XXXXXX?currentVersion=XX

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

            reject(new Error('Not Implemented'));
        })
    }
}

export default Navigation;
