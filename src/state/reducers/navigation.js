/*
 * This file includes all the basic navigation state reducers
 */

import * as ActionType from '../actions/actionTypes';
import { InitialNavigationState } from '../initial-state';

function reducer(state = InitialNavigationState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;
