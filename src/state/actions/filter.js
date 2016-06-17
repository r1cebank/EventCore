/*
* This file include all the filter actions
*/

import * as ActionType from './actionTypes';

export function applyFilters(selectedFilters, filters) {
    return {
        type: ActionType.APPLY_FILTERS,
        selectedFilters
    };
}
