/*
 *  VabView is the view that use tab bar component to display each page
 */

import React from 'react';

import {
    View,
    ScrollView
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

// Include navigation setting
import NavigationSetting from '../../../data/navigation.json';

// Include global
import Views from '../../global/includes/views';
import Components from '../../global/includes/components';


import Styles from './resources/styles';

class TabView extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
            <ScrollableTabView
            initialPage={NavigationSetting.data.config.defaults.initialPage}
            renderTabBar={(() => {
                const TabBarComponent = Components[NavigationSetting.data.config.typeconfig.tabbar];
                return <TabBarComponent />;
            })}>
            {NavigationSetting.data.pages.map((navItem, index) =>
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
