/*
*  This file defines the colors in the application
*/

/* eslint-disable global-require */

export const darkText = '#032250';
export const lightText = '#7F91A7';

const KEY_COLORS = {
    HERBST: '#00E3AD',
    'HERBST A': '#00E3AD',
    'HERBST B': '#00E3AD',
    'HACKER X': '#4D99EF',
    'HACKER Y': '#CF72B1',
    COWELL: '#6A6AD5',
    'COWELL C': '#6A6AD5',
    'FOOD TENT': '#FFCD3B'
};

export function colorForKey(key) {
    if (!key) {
        return 'black';
    }

    let color = KEY_COLORS[key.toUpperCase()];
    if (!key) {
        color = 'black';
    }
    return color;
}
