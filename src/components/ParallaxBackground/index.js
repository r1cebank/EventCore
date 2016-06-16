/* eslint-disable import/no-unresolved */
import React from 'react';
import  { Animated, View, Image, Dimensions } from 'react-native';

import Styles from './resources/styles';

import resolveAssetSource from 'resolveAssetSource';

const HEIGHT = Dimensions.get('window').height > 600
? 200
: 150;
const SCREEN_WIDTH = Dimensions.get('window').width;

class ParallaxBackground extends React.Component {
    static propTypes = {
        backgroundShift: React.PropTypes.number,
        minHeight: React.PropTypes.number,
        maxHeight: React.PropTypes.number,
        offset: React.PropTypes.object,
        backgroundColor: React.PropTypes.string,
        backgroundImage: React.PropTypes.number,
        children: React.PropTypes.element
    };

    constructor(props) {
        super(props);
        this.state = {
            shift: new Animated.Value(props.backgroundShift || 0)
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.backgroundShift !== this.props.backgroundShift) {
            Animated.timing(this.state.shift, {
                toValue: this.props.backgroundShift,
                duration: 300
            }).start();
        }
    }

    render() {
        const { minHeight, maxHeight, offset, backgroundColor } = this.props;
        const buffer = 10; // To reduce visual lag when scrolling
        const height = offset.interpolate({
            inputRange: [0, maxHeight - minHeight],
            outputRange: [maxHeight + buffer, minHeight + buffer],
            extrapolateRight: 'clamp'
        });

        return (
            <Animated.View style={[Styles.container, { height, backgroundColor }]}>
            {this.renderBackgroundImage()}
            {this.renderContent()}
            </Animated.View>
        );
    }

    renderBackgroundImage() {
        const { backgroundImage, minHeight, maxHeight, offset } = this.props;
        if (!backgroundImage) {
            return null;
        }

        const source = resolveAssetSource(backgroundImage);
        if (!source) {
            return null;
        }
        const { width } = source;
        const translateX = this.state.shift.interpolate({
            inputRange: [0, 1],
            outputRange: [0, SCREEN_WIDTH - width],
            extrapolate: 'clamp'
        });

        const length = maxHeight - minHeight;
        const translateY = offset.interpolate({
            inputRange: [0, length / 2, length],
            outputRange: [0, -length / 2, -length / 1.5],
            extrapolate: 'clamp'
        });
        // Sometimes image width is smaller than device's width
        const initialScale = Math.max(SCREEN_WIDTH / width * 2 - 1, 1);
        const scale = offset.interpolate({
            inputRange: [-length, 0],
            outputRange: [2, initialScale],
            extrapolateRight: 'clamp'
        });
        const transforms = { transform: [{ translateX }, { translateY }, { scale }] };
        return (
            <Animated.Image
            source={backgroundImage}
            style={transforms}
            />
        );
    }

    renderContent() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        const content = React.Children.only(this.props.children);

        const { minHeight, maxHeight, offset } = this.props;
        const length = maxHeight - minHeight;
        const opacity = offset.interpolate({
            inputRange: [0, length - 40],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const translateY = offset.interpolate({
            inputRange: [0, length],
            outputRange: [-32, -(length / 2) - 32],
            extrapolate: 'clamp'
        });
        const transforms = { opacity, transform: [{ translateY }] };
        return (
            <Animated.View style={[Styles.contentContainer, transforms]}>
            {content}
            </Animated.View>
        );
    }
}

// TODO: Remove this magic numbers
ParallaxBackground.HEIGHT = HEIGHT;

module.exports = ParallaxBackground;
