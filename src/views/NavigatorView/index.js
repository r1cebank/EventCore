import React from 'react';
// Include global
import { Views } from '../../global/globalIncludes';


import { Navigator, Platform } from 'react-native';
import { connect } from 'react-redux';


import Styles from './resources/styles';


class NavigatorView extends React.Component {

    renderScene(route, navigator) {
        // TODO: Later will add more stuff
        return <Views.TabView navigator={navigator} />;
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                style={Styles.container}
                configureScene={(route) => {
                    switch (route.routeStack) {
                        case 'FloatFromRight': {
                            return Navigator.SceneConfigs.FloatFromRight;
                        }
                        case 'FloatFromBottom': {
                            if (Platform.OS === 'android') {
                                return Navigator.SceneConfigs.FloatFromBottomAndroid;
                            }
                            return Navigator.SceneConfigs.FloatFromBottom;
                        }
                        // TODO: Add more support for routeStack
                        default:
                            return Navigator.SceneConfigs.PushFromRight;
                    }
                }}
                initialRoute={{}}
                renderScene={this.renderScene}
            />
        );
    }
}

function select(store) {
    return {
        tab: store.navigation.tab
    };
}

module.exports = connect(select)(NavigatorView);
