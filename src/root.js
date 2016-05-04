/* @flow */

import React from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

// Global includes
import Routes from './includes/routes';
import Views from './includes/views';


// Creating scenes from the routes
const scenes = Actions.create(
    <Scene key="root">
        {Routes.map((route) =>
            <Scene key={route.key} component={Views[route.component]} title={route.title} hideNavBar={true} />
        )}
    </Scene>
);

// Construct the root element
class Root extends React.Component {
    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}

export default Root;
