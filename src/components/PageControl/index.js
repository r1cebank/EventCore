/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View } from 'react-native';

import Styles from './resources/styles';

class F8PageControl extends React.Component {
    static propTypes = {
        style: View.propTypes.style,
        count: React.PropTypes.number.isRequired,
        selectedIndex: React.PropTypes.number.isRequired
    }

    render() {
        const images = [];
        for (let i = 0; i < this.props.count; i++) {
            let isSelected = this.props.selectedIndex === i;
            images.push(<Circle key={i} isSelected={isSelected} />);
        }
        return (
            <View style={[Styles.container, this.props.style]}>
            <View style={Styles.innerContainer}>
            {images}
            </View>
            </View>
        );
    }
}

class Circle extends React.Component {
    static propTypes = {
        isSelected: React.PropTypes.bool
    };

    render() {
        const extraStyle = this.props.isSelected ? Styles.full : Styles.empty;
        return <View style={[Styles.circle, extraStyle]} />;
    }
}

module.exports = F8PageControl;
