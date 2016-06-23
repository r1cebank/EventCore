/*
 *  App is where when the app first starts, it will include all the app starts
 *  logics and wrap everything inside this view
 */

import React from 'react';
import { connect } from 'react-redux';

import { StatusBar, View } from 'react-native';
import { Defaults } from '../../global/globalIncludes';


import Styles from './resources/styles';

import Navigation from './navigation';

class AppView extends React.Component {
    static propTypes = {
        loading: React.PropTypes.bool
    };
    render() {
        const loadingText = 'Loading...';
        const navigationView = this.props.loading ?
        <Defaults.LoadingView loadingText={loadingText} /> : <Navigation />;
        return (
            <View style={Styles.container}>
                <StatusBar
                  translucent
                  backgroundColor="rgba(0, 0, 0, 0.2)"
                  barStyle="light-content"
                 />
                 {navigationView}
            </View>
        );
    }
}

module.exports = connect((store) => ({
    loading: store.data.loading
}))(AppView);
