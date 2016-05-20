/*
 *  Navigation is where when the app first starts it reads from the configuration
 *  and determine which navigator to use
 */

import React from 'react';

import NavigationSetting from '../../data/navigation.json';

import { Views } from './global-includes';

class HomeView extends React.Component {
    render() {
        return (
            (() => {
                const NavigationView = Views[NavigationSetting.data.config.type];
                return <NavigationView />;
            })()
        );
    }
}

module.exports = HomeView;
