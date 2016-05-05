/* @flow */

import React from 'react-native';
import { Router } from 'react-native-router-flux';

// Include routes
import Routes from './routes';

// Construct the root element
class NavRouter extends React.Component {
    render() {
        return (
            <Router scenes={Routes} />
        );
    }
}

export default NavRouter;
