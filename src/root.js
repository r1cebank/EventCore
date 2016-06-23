/*
 * This is the root component, it is used to register with AppRegistry
 * Here the app will decide what root view type we will be using according to config
 */

/* @flow */
/* eslint-disable no-console */
/* global __DEV__ */

import React from 'react';
import { Provider } from 'react-redux';

// The root view is definatly the navigation component which define a default view
import App from './views/App';

import Env from './env';

import { Store, Actions } from './global/globalIncludes';

// Construct the root element
function setup() {
    // Initialize global variable here
    if (__DEV__) {
        // Dev initialization
    } else {
        console.disableYellowBox = true;
    }
    class Root extends React.Component {
        componentWillMount() {
            // Navigation startup code
            // 1) Populate settings
            // 2) Populate navigation
            // 3) Populate agenda
            // 4) Populate maps
            // 5) Populate speakers
            Promise.all([
                Store.appStore.dispatch(Actions.Data.fetchData(Env.config.navigation)),
                Store.appStore.dispatch(Actions.Data.fetchData(Env.config.agenda)),
                Store.appStore.dispatch(Actions.Data.fetchData(Env.config.maps)),
                Store.appStore.dispatch(Actions.Data.fetchData(Env.config.speakers))
            ]).then(() => {
                Store.appStore.dispatch(Actions.Data.loadingComplete());
            });
        }
        render() {
            return (
                <Provider store={Store.appStore}>
                    <App />
                </Provider>
            );
        }
    }
    return Root;
}

export default setup;
