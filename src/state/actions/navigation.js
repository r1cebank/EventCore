/*
* This file include all the navigation actions
*/

import * as ActionType from './actionTypes';

export function switchNavigation(tab) {
    return {
        type: ActionType.SWITCH_NAVIGATION,
        tab
    };
}
