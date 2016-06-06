/*
 *  This file is responsible to include all the views required for the app
 *  Each component must use their key defined in routes.js as their key in this
 *  file.
 */

/* eslint-disable global-require */

export const card = require('../../views/card');
export const ScrollableTabView = require('../../views/tab-view');

// F8
export const F8Navigator = require('../../views/f8-navigator');
export const F8TabView = require('../../views/f8-tabview');
export const GeneralScheduleView = require('../../views/general-schedule');
export const EmptySchedule = require('../../views/empty-schedule');
export const ScheduleListView = require('../../views/schedule-list-view');
export const PureListView = require('../../views/pure-list-view');
