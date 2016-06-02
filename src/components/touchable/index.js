import React from 'react';
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native';

function F8TouchableIOS(props) {
    return (
        <TouchableHighlight
        accessibilityTraits="button"
        underlayColor="#3C5EAE"
        {...props}
        />
    );
}

const F8Touchable = Platform.OS === 'android'
? TouchableNativeFeedback
: F8TouchableIOS;

module.exports = F8Touchable;
