/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Components } from '../../global/globalIncludes';
const { Text } = Components.Text;

import Styles from './resources/styles';

class Button extends React.Component {
    props: {
        type: 'primary' | 'secondary' | 'bordered';
        icon: number;
        caption: string;
        style: any;
        onPress: () => void;
    };

    render() {
        const caption = this.props.caption.toUpperCase();
        let icon;
        if (this.props.icon) {
            icon = <Image source={this.props.icon} style={Styles.icon} />;
        }
        let content;
        if (this.props.type === 'primary' || this.props.type === undefined) {
            content = (
                <LinearGradient
                start={[0.5, 1]} end={[1, 1]}
                colors={['#6A6AD5', '#6F86D9']}
                style={[Styles.button, Styles.primaryButton]}>
                {icon}
                <Text style={[Styles.caption, Styles.primaryCaption]}>
                {caption}
                </Text>
                </LinearGradient>
            );
        } else {
            const border = this.props.type === 'bordered' && Styles.border;
            content = (
                <View style={[Styles.button, border]}>
                {icon}
                <Text style={[Styles.caption, Styles.secondaryCaption]}>
                {caption}
                </Text>
                </View>
            );
        }
        return (
            <TouchableOpacity
            accessibilityTraits="button"
            onPress={this.props.onPress}
            activeOpacity={0.8}
            style={[Styles.container, this.props.style]}>
            {content}
            </TouchableOpacity>
        );
    }
}

module.exports = Button;
