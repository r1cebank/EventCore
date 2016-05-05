import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

// Global includes
import Routes from '../../includes/routes';
import Views from '../../includes/views';


// Creating scenes from the routes
const scenes = Actions.create(
    <Scene key="root">
        {Routes.map((route) =>
            <Scene key={route.key} component={Views[route.component]} title={route.title} hideNavBar={true} />
        )}
    </Scene>
);

export default scenes;
