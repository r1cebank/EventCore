/*
 * This is the root component, it is used to register with AppRegistry
 * Here the app will decide what root view type we will be using according to config
 */

/* @flow */

import React from 'react';
import { Provider } from 'react-redux';

// The root view is definatly the navigation component which define a default view
import App from './views/App';

import { Store, Actions } from './global/globalIncludes';

// Construct the root element
function setup() {
    // Initialize global variable here
    class Root extends React.Component {
        componentWillMount() {
            // Navigation startup code
            // 1) Populate settings
            // 2) Populate navigation
            Store.appStore.dispatch(Actions.Data.fetchNavigation());
            Store.appStore.dispatch(Actions.Data.fetchAgenda());
            Store.appStore.dispatch(Actions.Data.fetchMaps());
            Store.appStore.dispatch(Actions.Data.fetchSpeakers());
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
