import { View, Text } from 'react-native';
import React from 'react';
import Spinner from 'react-native-spinkit';

class LoadingView extends React.Component {
    static propTypes = {
        warningText: React.PropTypes.string.isRequired
    };
    render() {
        return (
            <View style={styles.container}>
                <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color}/>
            </View>
        );
    }
}

module.exports = LoadingView;
