/*
 * This is the root component, it is used to register with AppRegistry
 * Here the app will decide what root view type we will be using according to config
 */

/* @flow */

import React from 'react';

// The root view is definatly the navigation component which define a default view
import Navigation from './global/navigation';

// Construct the root element
class Root extends React.Component {
    render() {
        return (
            <Navigation />
        );
    }
}

export default Root;
