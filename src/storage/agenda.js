/*
*  This file handles the storage of agendas, it also include a way to
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
import Env from '../env/env';


const DiffPatcher = require('jsondiffpatch').create({ cloneDiffValues: false });

const Agenda = {
    fetch: () => {
        SimpleStore.get('agenda').then((agendaData) => {
            // Dispatch fetched action
            if (agendaData) {
                Store.appStore.dispatch(DataActions.agendaFetched(agendaData));
                Store.appStore.dispatch(DataActions.updateAgenda());
            } else {
                // Init the data storage, will call for non patch endpoint
                // https://event.com/update/navigation/raw?appId=XXXXXXX
                // fetch(`${Env.api}/update/navigation/raw`, {
                //     method: 'GET',
                //     body: {
                //         appId: Env.appId
                //     }
                // })
                fetch('https://www.dropbox.com/s/0m9mx6yvp4zz1f4/agenda.json?raw=1', {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((requestedAgendaData) => {
                    SimpleStore.save('agenda', requestedAgendaData).then(() => {
                        Store.appStore.dispatch(DataActions.agendaFetched(requestedAgendaData));
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
        SimpleStore.get('agenda').then((agendaData) => {
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
                        agendaData = DiffPatcher.patch(agendaData, patch);
                    }
                    SimpleStore.save('agenda', agendaData).then(() => {
                        Store.appStore.dispatch(DataActions.agendaFetched(agendaData));
                    }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
                }
            })
            .catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    }
};

module.exports = Agenda;
