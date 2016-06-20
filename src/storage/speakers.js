/*
*  This file handles the storage of speakers, it also include a way to
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

const speakers = {
    fetch: () => {
        SimpleStore.get('speakers').then((speakersData) => {
            // Dispatch fetched action
            if (speakersData) {
                Store.appStore.dispatch(DataActions.speakersFetched(speakersData));
                Store.appStore.dispatch(DataActions.updateApeakers());
            } else {
                // Init the data storage, will call for non patch endpoint
                // https://event.com/update/navigation/raw?appId=XXXXXXX
                // fetch(`${Env.api}/update/navigation/raw`, {
                //     method: 'GET',
                //     body: {
                //         appId: Env.appId
                //     }
                // })
                fetch('https://www.dropbox.com/s/45ye8gs616rzkgs/speakers.json?raw=1', {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((requestedApeakersData) => {
                    SimpleStore.save('speakers', requestedApeakersData).then(() => {
                        Store.appStore.dispatch(DataActions.speakersFetched(requestedApeakersData));
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
        SimpleStore.get('speakers').then((speakersData) => {
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
                        speakersData = DiffPatcher.patch(speakersData, patch);
                    }
                    SimpleStore.save('speakers', speakersData).then(() => {
                        Store.appStore.dispatch(DataActions.speakersFetched(speakersData));
                    }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                }
            })
            .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    }
};

module.exports = speakers;
