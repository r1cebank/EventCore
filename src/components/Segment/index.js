import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';

import { Components } from '../../global/globalIncludes';

const { Text } = Components.Text;

import Styles from './resources/styles';

class Segment extends React.Component {
    static propTypes = {
        isSelected: React.PropTypes.bool,
        selectionColor: React.PropTypes.string,
        value: React.PropTypes.string,
        onPress: React.PropTypes.func
    };
    render() {
        let selectedButtonStyle;
        if (this.props.isSelected) {
            selectedButtonStyle = { borderColor: this.props.selectionColor };
        }
        let deselectedLabelStyle;
        if (!this.props.isSelected && Platform.OS === 'android') {
            deselectedLabelStyle = Styles.deselectedLabel;
        }
        const title = this.props.value && this.props.value.toUpperCase();

        const accessibilityTraits = ['button'];
        if (this.props.isSelected) {
            accessibilityTraits.push('selected');
        }

        return (
            <TouchableOpacity
            accessibilityTraits={accessibilityTraits}
            activeOpacity={0.8}
            onPress={this.props.onPress}
            style={[Styles.button, selectedButtonStyle]}>
                <Text style={[Styles.label, deselectedLabelStyle]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
}

module.exports = Segment;
