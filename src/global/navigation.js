/*
*  Navigation is where when the app first starts it reads from the configuration
*  and determine which navigator to use
*/

import React from 'react';
import { connect } from 'react-redux';

import { Views, Defaults } from './globalIncludes';

class HomeView extends React.Component {
    static propTypes = {
        loading: React.PropTypes.bool,
        navigation: React.PropTypes.object
    };
    render() {
        return (
            (() => {
                //  If loading, return loading view
                if (this.props.loading) {
                    const loadingText = '';
                    return <Defaults.loadingView loadingText={loadingText} />;
                }
                const NavigationView = Views[this.props.navigation.data.config.type];
                //  If the component is missing, fallback to default with message
                if (!NavigationView) {
                    const warningText = `View ${this.props.navigation.data.config.type} not found`;
                    return <Defaults.warningView warningText={warningText} />;
                }
                return <NavigationView />;
            })()
        );
    }
}


module.exports = connect((store) => ({
    loading: store.data.loading,
    navigation: store.data.navigation
}))(HomeView);
