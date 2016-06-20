/*
 * This is the root component, it is used to register with AppRegistry
 * Here the app will decide what root view type we will be using according to config
 */

/* @flow */
/* global __DEV__ */

import React from 'react';
import { Provider } from 'react-redux';

// The root view is definatly the navigation component which define a default view
import App from './views/App';

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
            Store.appStore.dispatch(Actions.Data.fetchData({
                storageKey: 'navigation',
                fetched: 'dataFetched',
                update: 'updateData',
                rawURL: 'https://www.dropbox.com/s/k7y933t3wr1jyu0/navigation.json?raw=1',
                rawURLParams : {
                    method: 'GET'
                },
                updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
                updateURLParams: {
                    method: 'GET'
                }
            }));
            Store.appStore.dispatch(Actions.Data.fetchData({
                storageKey: 'agenda',
                fetched: 'dataFetched',
                update: 'updateData',
                rawURL: 'https://www.dropbox.com/s/0m9mx6yvp4zz1f4/agenda.json?raw=1',
                rawURLParams : {
                    method: 'GET'
                },
                updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
                updateURLParams: {
                    method: 'GET'
                }
            }));
            Store.appStore.dispatch(Actions.Data.fetchData({
                storageKey: 'maps',
                fetched: 'dataFetched',
                update: 'updateData',
                rawURL: 'https://www.dropbox.com/s/vq2rxyqn7lxfw8y/maps.json?raw=1',
                rawURLParams : {
                    method: 'GET'
                },
                updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
                updateURLParams: {
                    method: 'GET'
                }
            }));
            Store.appStore.dispatch(Actions.Data.fetchData({
                storageKey: 'speakers',
                fetched: 'dataFetched',
                update: 'updateData',
                rawURL: 'https://www.dropbox.com/s/45ye8gs616rzkgs/speakers.json?raw=1',
                rawURLParams : {
                    method: 'GET'
                },
                updateURL: 'https://www.dropbox.com/s/76pksj4t3czy71f/patch?raw=1',
                updateURLParams: {
                    method: 'GET'
                }
            }));
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
