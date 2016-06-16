import React from 'react';
import { View } from 'react-native';

import Styles from './resources/styles';

class Circle extends React.Component {
    static propTypes = {
        isSelected: React.PropTypes.bool
    };

    render() {
        const extraStyle = this.props.isSelected ? Styles.full : Styles.empty;
        return <View style={[Styles.circle, extraStyle]} />;
    }
}

module.exports = Circle;
