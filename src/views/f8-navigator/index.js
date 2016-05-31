'use strict';

import React from 'react';
// Include global
import { Views } from '../../global/global-includes';


import { Navigator, Platform, View } from 'react-native';
import { connect } from 'react-redux';


import Styles from './resources/styles';


class F8Navigator extends React.Component {

    renderScene(route, navigator) {
        return <Views.card />;
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                style={Styles.container}
                configureScene={(route) => {
                    if (Platform.OS === 'android') {
                        return Navigator.SceneConfigs.FloatFromBottomAndroid;
                    }
                    // TODO: Proper scene support
                    if (route.shareSettings || route.friend) {
                        return Navigator.SceneConfigs.FloatFromRight;
                    } else {
                        return Navigator.SceneConfigs.FloatFromBottom;
                    }
                }}
                initialRoute={{}}
                renderScene={this.renderScene}
            />
        );
    }
}

// function select(store) {
//     return {
//         tab: store.navigation.tab,
//         isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin
//     };
// }

// module.exports = connect(select)(F8Navigator);

module.exports = F8Navigator;
