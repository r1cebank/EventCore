/*
*  This file handles the storage of settings
*/
/* eslint-disable quote-props */

import SimpleStore from 'react-native-simple-store';

// Global Actions
import * as DataActions from '../state/actions/data';
import * as UtilActions from '../state/actions/util';
import * as NavActions from '../state/actions/navigation';


// Global Includes
import { Store } from '../global/globalIncludes';

const Settings = {
    get: (key) => {
        SimpleStore.get('setting').then((navData) => {
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    },
    set: (key) => {
        SimpleStore.get('setting').then((navData) => {
        }).catch((e) => { Store.appStore.dispatch(UtilActions.appError(e)); });
    },

};

module.exports = Settings;
