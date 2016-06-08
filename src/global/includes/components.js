/*
 *  This file defines the components in the application
 */

/* eslint-disable global-require */



const components = {
    get FacebookTabBar() { return require('../../components/FacebookTabBar'); },

    // F8
    get FilterHeader() { return require('../../components/FilterHeader'); },
    get ListContainer() { return require('../../components/ListContainer'); },
    get DrawerLayout() { return require('../../components/DrawerLayout'); },
    get Text() { return require('../../components/Text'); },
    get SessionSectionHeader() { return require('../../components/SessionSectionHeader'); },
    get ViewPager() { return require('../../components/ViewPager'); },
    get Header() { return require('../../components/Header'); },
    get Touchable() { return require('../../components/Touchable'); },
    get SessionCell() { return require('../../components/SessionCell'); },
    get SegmentedControl() { return require('../../components/SegmentedControl'); },
    get ParallaxBackground() { return require('../../components/ParallaxBackground'); }
};

module.exports = components;
