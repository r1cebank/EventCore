/* @flow */

import React from 'react-native';

// The root view is definatly the navigation component which define a default view
import RootView from './global/tab-navigation';

// Construct the root element
class Root extends React.Component {
    render() {
        return (
            <RootView />
        );
    }
}

export default Root;
