/*
* This file include all the data actions
*/

import * as ActionType from './actionTypes';

export function fetchData(config) {
    return {
        type: ActionType.FETCH_DATA,
        config
    };
}

export function updateData(config) {
    return {
        type: ActionType.UPDATE_DATA,
        config
    };
}

export function dataFetched(config, data) {
    return {
        type: ActionType.DATA_FETCHED,
        config,
        data
    };
}
