/*
 * This file includes all the basic app state reducers
 */

import * as ActionType from '../actions/actionTypes';
import { InitialAppState } from '../initialState';

function reducer(state = InitialAppState, action) {
    switch (action.type) {
        case ActionType.DATA_FETCHED: {
            const newState = {
                ...state
            };
            newState[action.config.storageKey] = action.data;
            return newState;
        }
        case ActionType.LOADING_COMPLETE: {
            return {
                ...state,
                loading: false
            };
        }
        default:
            return state;
    }
}

export default reducer;
