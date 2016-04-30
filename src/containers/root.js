/* @flow */

import React, { Text, View, StyleSheet } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello World</Text>
            </View>
        );
    }
}

const scenes = Actions.create(
    <Scene key="root">
    <Scene key="home" component={Home} title="Home" />
    </Scene>
);

class Root extends React.Component {
    render() {
        return (
            <Router scenes={scenes} />
        );
    }
}

export default Root;
