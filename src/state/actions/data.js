/*
* This file include all the data actions
*/

import * as ActionType from './actionTypes';
import { Storage } from '../../global/globalIncludes';

export function fetchData(config) {
    return dispatch => {
        return Storage.Generic().fetch(config).then((data) => {
            dispatch({ type: ActionType.DATA_FETCHED, config, data });
        })
        .catch((error) => { dispatch({ type: ActionType.APP_ERROR, error }); });
    };
}

export function loadingComplete() {
    return {
        type: ActionType.LOADING_COMPLETE
    };
}

export function updateData(config) {
    return dispatch => {
        return Storage.Generic().update(config).then((data) => {
            if (data.patched) {
                dispatch({ type: ActionType.DATA_FETCHED, config, data: data.patched });
            }
        })
        .catch((error) => { dispatch({ type: ActionType.APP_ERROR, error }); });
    };
}
