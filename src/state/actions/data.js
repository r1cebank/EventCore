/*
* This file include all the data actions
*/

import * as ActionType from './actionTypes';

export function fetchNavigation() {
    return {
        type: ActionType.FETCH_NAVIGATION
    };
}

export function updateNavigation() {
    return {
        type: ActionType.UPDATE_NAVIGATION
    };
}

export function navigationFetched(data) {
    return {
        type: ActionType.NAVIGATION_FETCHED,
        data
    };
}
export function fetchAgenda() {
    return {
        type: ActionType.FETCH_AGENDA
    };
}

export function updateAgenda() {
    return {
        type: ActionType.UPDATE_AGENDA
    };
}

export function agendaFetched(data) {
    return {
        type: ActionType.AGENDA_FETCHED,
        data
    };
}
export function fetchMaps() {
    return {
        type: ActionType.FETCH_MAPS
    };
}

export function updateMaps() {
    return {
        type: ActionType.UPDATE_MAPS
    };
}

export function mapsFetched(data) {
    return {
        type: ActionType.MAPS_FETCHED,
        data
    };
}
