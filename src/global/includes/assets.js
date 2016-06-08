/*
 *  This file defines the assets in the application
 */

/* eslint-disable global-require */



const assets = {
    get XWhite() { return require('../assets/x-white.png'); },
    get Filter() { return require('../assets/filter.png'); },
    get ScheduleBackground() { return require('../assets/schedule-background.png'); },
    get HamburgerUnread() { return require('../assets/hamburger-unread.png'); },
    get Hamburger() { return require('../assets/hamburger.png'); },
    get AddedCell() { return require('../assets/added-cell.png'); }
};

module.exports = assets;
