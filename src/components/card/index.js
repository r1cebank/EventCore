import React, { Text, View } from 'react-native';


import Styles from './resources/styles';

class Card extends React.Component {
    render() {
        return (
            <View style={Styles.card}>
                <Text>Other nav</Text>
            </View>
        );
    }
}

module.exports = Card;
