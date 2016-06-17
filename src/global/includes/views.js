/*
 *  This file is responsible to include all the views required for the app
 *  Each component must use their key defined in routes.js as their key in this
 *  file.
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

const views = {
    get card() { return require('../../views/Card'); },

    // F8
    get NavigatorView() { return require('../../views/NavigatorView'); },
    get TabView() { return require('../../views/TabView'); },
    get GeneralScheduleView() { return require('../../views/GeneralScheduleView'); },
    get EmptyScheduleView() { return require('../../views/EmptyScheduleView'); },
    get ScheduleListView() { return require('../../views/ScheduleListView'); },
    get PureListView() { return require('../../views/PureListView'); },
    get FilterScreenView() { return require('../../views/FilterScreenView'); },
    get SessionsCarouselView() { return require('../../views/SessionsCarouselView'); }
};

module.exports = views;
