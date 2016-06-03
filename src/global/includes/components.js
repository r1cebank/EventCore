/*
 *  This file defines the components in the application
 */

/* eslint-disable global-require */



const components = {
    get FacebookTabBar() { return require('../../components/facebook-tabbar'); },

    // F8
    get FilterHeader() { return require('../../components/filter-header'); },
    get ListContainer() { return require('../../components/list-container'); },
    get DrawerLayout() { return require('../../components/drawer-layout'); },
    get F8Text() { return require('../../components/text'); },
    get SessionsSectionHeader() { return require('../../components/sessions-section-header'); },
    get ViewPager() { return require('../../components/view-pager'); },
    get Header() { return require('../../components/header'); },
    get Touchable() { return require('../../components/touchable'); },
    get SessionCell() { return require('../../components/session-cell'); },
    get SegmentedControl() { return require('../../components/segmented-control'); },
    get ParallaxBackground() { return require('../../components/parallax-background'); }
}

module.exports = components;
