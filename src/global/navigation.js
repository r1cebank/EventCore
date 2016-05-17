/*
 *  Navigation is where when the app first starts it reads from the configuration
 *  and determine which navigator to use
 */

import React from 'react';

import Home from '../components/tab-view/index';

class HomeView extends React.Component {
    render() {
        return (
            <Home />
        );
    }
}

module.exports = HomeView;
