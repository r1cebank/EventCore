/*
*  This file handles the storage of agendas, it also include a way to
*  trigger update
*/
/* eslint-disable quote-props */
import SimpleStore from 'react-native-simple-store';


const DiffPatcher = require('jsondiffpatch').create({ cloneDiffValues: false });


function Generic(Storage = SimpleStore, fetchLib = fetch) {
    return {
        fetch: (config) => {
            return new Promise((resolve, reject) => {
                Storage.get(config.storageKey).then((data) => {
                    // Dispatch fetched action
                    if (data) {
                        resolve(data);
                    } else {
                        fetchLib(config.rawURL, config.rawURLParams)
                        .then((response) => response.json())
                        .then((requestedData) => {
                            resolve(requestedData);
                            Storage.save(config.storageKey, requestedData);
                        });
                    }
                }).catch((e) => { reject(e); });
            });
        },
        update: (config) => {
            return new Promise((resolve, reject) => {
                Storage.get(config.storageKey).then((data) => {
                    fetchLib(config.updateURL, config.updateURLParams)
                    .then((response) => response.json())
                    .then((patches) => {
                        if (patches.length) {
                            for (const patch of patches) {
                                data = DiffPatcher.patch(data, patch);
                            }
                            resolve({ patched: data });
                            Storage.save(config.storageKey, data);
                        } else {
                            resolve({});
                        }
                    });
                }).catch((e) => { reject(e); });
            });
        }
    };
}

module.exports = Generic;
