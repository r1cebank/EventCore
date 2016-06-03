import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';

import Styles from './resources/styles';
import { Components } from '../../global/global-includes';

class F8SegmentedControl extends React.Component {
    render() {
        var segments = this.props.values.map(
            (value, index) => (
                <Segment
                key={value}
                value={value}
                isSelected={index === this.props.selectedIndex}
                selectionColor={this.props.selectionColor || 'white'}
                onPress={() => this.props.onChange(index)}
                />
            )
        );
        return (
            <View style={[Styles.container, this.props.style]}>
                {segments}
            </View>
        );
    }
}

class Segment extends React.Component {

    render() {
        var selectedButtonStyle;
        if (this.props.isSelected) {
            selectedButtonStyle = { borderColor: this.props.selectionColor };
        }
        var deselectedLabelStyle;
        if (!this.props.isSelected && Platform.OS === 'android') {
            deselectedLabelStyle = Styles.deselectedLabel;
        }
        var title = this.props.value && this.props.value.toUpperCase();

        var accessibilityTraits = ['button'];
        if (this.props.isSelected) {
            accessibilityTraits.push('selected');
        }

        return (
            <TouchableOpacity
            accessibilityTraits={accessibilityTraits}
            activeOpacity={0.8}
            onPress={this.props.onPress}
            style={[Styles.button, selectedButtonStyle]}>
                <Components.Text style={[Styles.label, deselectedLabelStyle]}>
                    {title}
                </Components.Text>
            </TouchableOpacity>
        );
    }
}

module.exports = F8SegmentedControl;
