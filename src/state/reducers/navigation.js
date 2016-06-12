/*
 * This file includes all the basic navigation state reducers
 */

import * as ActionType from '../actions/actionTypes';
import { InitialNavigationState } from '../initialState';

function reducer(state = InitialNavigationState, action) {
    switch (action.type) {
        case ActionType.SWITCH_NAVIGATION: {
            return {
                ...state,
                tab: action.tab
            };
        }
        case ActionType.SWITCH_DAY: {
            return {
                ...state,
                day: action.day
            };
        }
        default:
            return state;
    }
}

export default reducer;
