/*
 * This file includes all the basic filter state reducers
 */

import * as ActionType from '../actions/actionTypes';
import { InitialFilterState } from '../initialState';

function reducer(state = InitialFilterState, action) {
    switch (action.type) {
        case ActionType.APPLY_FILTERS: {
            return action.selectedFilters;
        }
        case ActionType.CLEAR_FILTERS: {
            return {};
        }
        default:
            return state;
    }
}

export default reducer;
