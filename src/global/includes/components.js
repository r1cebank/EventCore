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
    get Section() { return require('../../components/Section'); },
    get ViewPager() { return require('../../components/ViewPager'); },
    get Circle() { return require('../../components/Circle'); },
    get Header() { return require('../../components/Header'); },
    get Touchable() { return require('../../components/Touchable'); },
    get SessionCell() { return require('../../components/SessionCell'); },
    get SegmentedControl() { return require('../../components/SegmentedControl'); },
    get Segment() { return require('../../components/Segment'); },
    get ParallaxBackground() { return require('../../components/ParallaxBackground'); },
    get Carousel() { return require('../../components/Carousel'); },
    get SessionDetails() { return require('../../components/SessionDetails'); },
    get AddToScheduleButton() { return require('../../components/AddToScheduleButton'); },
    get PageControl() { return require('../../components/PageControl'); },
    get FilterItem() { return require('../../components/FilterItem'); },
    get ItemsWithSeparator() { return require('../../components/ItemsWithSeparator'); },
    get Button() { return require('../../components/Button'); },
    get SpeakerProfile() { return require('../../components/SpeakerProfile'); }
};

module.exports = components;
