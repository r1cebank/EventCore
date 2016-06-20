/*
 * Stored environment variables for the app
 */

'use strict';
module.exports = {
    config: {
        navigation: {
            storageKey: 'navigation',
            fetched: 'dataFetched',
            update: 'updateData',
            rawURL: 'https://www.dropbox.com/s/k7y933t3wr1jyu0/navigation.json?raw=1',
            rawURLParams : {
                method: 'GET'
            },
            updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
            updateURLParams: {
                method: 'GET'
            }
        },
        agenda: {
            storageKey: 'agenda',
            fetched: 'dataFetched',
            update: 'updateData',
            rawURL: 'https://www.dropbox.com/s/0m9mx6yvp4zz1f4/agenda.json?raw=1',
            rawURLParams : {
                method: 'GET'
            },
            updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
            updateURLParams: {
                method: 'GET'
            }
        },
        maps: {
            storageKey: 'maps',
            fetched: 'dataFetched',
            update: 'updateData',
            rawURL: 'https://www.dropbox.com/s/vq2rxyqn7lxfw8y/maps.json?raw=1',
            rawURLParams : {
                method: 'GET'
            },
            updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
            updateURLParams: {
                method: 'GET'
            }
        },
        speakers: {
            storageKey: 'speakers',
            fetched: 'dataFetched',
            update: 'updateData',
            rawURL: 'https://www.dropbox.com/s/45ye8gs616rzkgs/speakers.json?raw=1',
            rawURLParams : {
                method: 'GET'
            },
            updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
            updateURLParams: {
                method: 'GET'
            }
        }
    }
};
