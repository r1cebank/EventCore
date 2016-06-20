/*
 * This file includes all the basic app state reducers
 */

import { Storage } from '../../global/globalIncludes';
import * as ActionType from '../actions/actionTypes';
import { InitialAppState } from '../initialState';

function reducer(state = InitialAppState, action) {
    switch (action.type) {
        case ActionType.FETCH_NAVIGATION: {
            // TODO: Adding real configs
            Storage.Navigation.fetch();
            return {
                ...state
            };
        }
        case ActionType.NAVIGATION_FETCHED: {
            return {
                ...state,
                loading: false,
                navigation: action.data
            };
        }
        case ActionType.UPDATE_NAVIGATION: {
            Storage.Navigation.update();
            return {
                ...state
            };
        }
        case ActionType.FETCH_AGENDA: {
            // TODO: Adding real configs
            Storage.Agenda.fetch();
            return {
                ...state
            };
        }
        case ActionType.AGENDA_FETCHED: {
            return {
                ...state,
                loading: false,
                agenda: action.data
            };
        }
        case ActionType.UPDATE_AGENDA: {
            Storage.Agenda.update();
            return {
                ...state
            };
        }
        case ActionType.FETCH_MAPS: {
            // TODO: Adding real configs
            Storage.Maps.fetch();
            return {
                ...state
            };
        }
        case ActionType.MAPS_FETCHED: {
            return {
                ...state,
                loading: false,
                maps: action.data
            };
        }
        case ActionType.UPDATE_MAPS: {
            Storage.Maps.update();
            return {
                ...state
            };
        }
        case ActionType.FETCH_SPEAKERS: {
            // TODO: Adding real configs
            Storage.Speakers.fetch();
            return {
                ...state
            };
        }
        case ActionType.SPEAKERS_FETCHED: {
            return {
                ...state,
                loading: false,
                speakers: action.data
            };
        }
        case ActionType.UPDATE_SPEAKERS: {
            Storage.Speakers.update();
            return {
                ...state
            };
        }
        default:
            return state;
    }
}

export default reducer;
