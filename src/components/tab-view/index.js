import React from 'react';

import {
    Text,
    View,
    ScrollView
} from 'react-native';

import FacebookTabBar from '../facebook-tabbar/index';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Styles from './resources/styles';

class HomeView extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <ScrollableTabView initialPage={1} renderTabBar={() => <FacebookTabBar />}>
                    <ScrollView tabLabel="ios-paper" style={Styles.tabView}>
                        <View style={Styles.card}>
                            <Text>News</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="person-stalker" style={Styles.tabView}>
                        <View style={Styles.card}>
                            <Text>Friends</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-chatboxes" style={Styles.tabView}>
                        <View style={Styles.card}>
                            <Text>Messenger</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-world" style={Styles.tabView}>
                        <View style={Styles.card}>
                            <Text>Notifications</Text>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="navicon-round" style={Styles.tabView}>
                        <View style={Styles.card}>
                            <Text>Other nav</Text>
                        </View>
                    </ScrollView>
                </ScrollableTabView>
            </View>
        );
    }
}

module.exports = HomeView;
