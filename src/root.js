/*
 * This is the root component, it is used to register with AppRegistry
 * Here the app will decide what root view type we will be using according to config
 */

/* @flow */

import React from 'react';
import { Provider } from 'react-redux';

// The root view is definatly the navigation component which define a default view
import Navigation from './global/navigation';
import App from './global/app';

import configureStore from './global/state/configure-store';

// Configure Global store
const store = configureStore();

// Construct the root element
class Root extends React.Component {
    componentWillMount() {
        // Navigation startup code
        // 1) Populate settings
    }
    render() {
        return (
            <Provider store={store}>
                <App>
                    <Navigation />
                </App>
            </Provider>
        );
    }
}

export default Root;
