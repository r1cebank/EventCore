/*
 *  This file is responsible to include all the views required for the app
 *  Each component must use their key defined in routes.js as their key in this
 *  file.
 */

/* eslint-disable global-require */

const views = {
    get card() { return require('../../views/Card'); },
    get ScrollableTabView() { return require('../../views/ScrollableTabView'); },

    // F8
    get NavigatorView() { return require('../../views/NavigatorView'); },
    get TabView() { return require('../../views/TabView'); },
    get GeneralScheduleView() { return require('../../views/GeneralScheduleView'); },
    get EmptyScheduleView() { return require('../../views/EmptyScheduleView'); },
    get ScheduleListView() { return require('../../views/ScheduleListView'); },
    get PureListView() { return require('../../views/PureListView'); }
};

module.exports = views;
