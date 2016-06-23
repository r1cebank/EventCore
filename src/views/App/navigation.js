/*
*  Navigation is where when the app first starts it reads from the configuration
*  and determine which navigator to use
*/

import React from 'react';
import { connect } from 'react-redux';

import { Views, Defaults } from '../../global/globalIncludes';

class NavigationShell extends React.Component {
    static propTypes = {
        loading: React.PropTypes.bool,
        navigation: React.PropTypes.object
    };
    render() {
        return (
            (() => {
                const NavigationView = Views[this.props.navigation.config.type];
                //  If the component is missing, fallback to default with message
                if (!NavigationView) {
                    const warningText = `View ${this.props.navigation.config.type} not found`;
                    return <Defaults.WarningView warningText={warningText} />;
                }
                return <NavigationView />;
            })()
        );
    }
}


module.exports = connect((store) => ({
    navigation: store.data.navigation.data
}))(NavigationShell);
