import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Components } from '../../global/globalIncludes';

import Styles from './resources/styles';

const { Text } = Components.Text;

class TopicItem extends React.Component {
    props: {
        filter: string;
        color: string;
        isChecked: boolean;
        onToggle: (value: boolean) => void;
    };

    render() {
        const { filter, color, isChecked, onToggle } = this.props;
        const style = isChecked
        ? { backgroundColor: color }
        : { borderColor: color, borderWidth: 1 };
        const accessibilityTraits = ['button'];
        if (isChecked) {
            accessibilityTraits.push('selected');
        }
        return (
            <TouchableOpacity
                accessibilityTraits={accessibilityTraits}
                activeOpacity={0.8}
                style={Styles.container}
                onPress={onToggle}>
                <View style={[Styles.checkbox, style]} />
                <Text style={Styles.title}>
                    {filter}
                </Text>
            </TouchableOpacity>
        );
    }
}

module.exports = TopicItem;
