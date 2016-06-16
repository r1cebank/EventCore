import React from 'react';
import { View } from 'react-native';

import { Components } from '../../global/globalIncludes';

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
            images.push(<Components.Circle key={i} isSelected={isSelected} />);
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

module.exports = F8PageControl;
