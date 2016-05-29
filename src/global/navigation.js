/*
*  Navigation is where when the app first starts it reads from the configuration
*  and determine which navigator to use
*/

import React from 'react';
import { connect } from 'react-redux';

import NavigationSetting from '../../data/navigation.json';

import { Views, Defaults } from './global-includes';

class HomeView extends React.Component {
    static propTypes = {
        loading: React.PropTypes.bool
    };
    render() {
        return (
            (() => {
                //  If loading, return loading view
                if (this.props.loading) {
                    const loadingText = '';
                    return <Defaults.loadingView loadingText={loadingText} />;
                }
                const NavigationView = Views[NavigationSetting.data.config.type];
                //  If the component is missing, fallback to default with message
                if (!NavigationView) {
                    const warningText = `View ${NavigationSetting.data.config.type} not found`;
                    return <Defaults.warningView warningText={warningText} />;
                }
                return <NavigationView />;
            })()
        );
    }
}


module.exports = connect((state) => ({
    loading: state.appstate.loading,
    navigationSetting: state.appstate.navigationSetting
}))(HomeView);
