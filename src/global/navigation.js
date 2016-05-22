/*
 *  Navigation is where when the app first starts it reads from the configuration
 *  and determine which navigator to use
 */

import React from 'react';

import NavigationSetting from '../../data/navigation.json';

import { Views, Defaults } from './global-includes';

class HomeView extends React.Component {
    render() {
        return (
            (() => {
                const NavigationView = Views[NavigationSetting.data.config.type];
                // If the component is missing, fallback to default with message
                if (!NavigationView) {
                    const warningText = `View ${NavigationSetting.data.config.type} not found`;
                    return <Defaults.warningView warningText={warningText} />;
                }
                return <NavigationView />;
            })()
        );
    }
}

module.exports = HomeView;
