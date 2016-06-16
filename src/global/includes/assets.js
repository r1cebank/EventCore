/*
 *  This file defines the assets in the application
 */

/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */


const assets = {
    get XWhite() { return require('../assets/x-white.png'); },
    get Filter() { return require('../assets/filter.png'); },
    get ScheduleBackground() { return require('../assets/schedule-background.png'); },
    get HamburgerUnread() { return require('../assets/hamburger-unread.png'); },
    get Hamburger() { return require('../assets/hamburger.png'); },
    get AddedCell() { return require('../assets/added-cell.png'); },
    get Share() { return require('../assets/share.png'); },
    get BackWhite() { return require('../assets/back_white.png'); },
    get React() { return require('../assets/added-react.png'); },
    get Added() { return require('../assets/added.png'); },
    get Add() { return require('../assets/add.png'); }
};

module.exports = assets;
