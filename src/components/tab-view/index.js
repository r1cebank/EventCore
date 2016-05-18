import React from 'react';

import {
    Text,
    View,
    ScrollView
} from 'react-native';

const FacebookTabBar = require('../facebook-tabbar/index');
import ScrollableTabView from 'react-native-scrollable-tab-view';

// Include navigation setting
import NavItems from '../../../data/navigation.json';

// Include global
import Views from '../../global/includes/views';


import Styles from './resources/styles';

class TabView extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <ScrollableTabView initialPage={NavItems.data.config.defaults.initialPage} renderTabBar={() => <FacebookTabBar />}>
                    {NavItems.data.links.map((navItem, index) =>
                        <ScrollView tabLabel={navItem.label} key={index} style={Styles.tabView}>
                            {(() => {
                                const ComponentView = Views[navItem.view];
                                return <ComponentView />;
                            })()}
                        </ScrollView>
                    )}
                </ScrollableTabView>
            </View>
        );
    }
}

module.exports = TabView;
