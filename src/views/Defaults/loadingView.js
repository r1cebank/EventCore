import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d35400'
    },
    spinner: {
        marginBottom: 50
    },
    text: {
        color: "white"
    }
});

class LoadingView extends React.Component {
    static propTypes = {
        loadingText: React.PropTypes.string
    };
    render() {
        return (
            <View style={styles.container}>
                <Spinner color="#FFFFFF" style={styles.spinner} type="Bounce"/>
                <Text style={styles.text}>{this.props.loadingText}</Text>
            </View>
        );
    }
}

module.exports = LoadingView;
