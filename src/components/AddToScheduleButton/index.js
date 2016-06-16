/* eslint-disable import/no-unresolved */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Animated, View, TouchableOpacity, Image } from 'react-native';
import { Components, Assets } from '../../global/globalIncludes';
const { Text } = Components.Text;

import Styles from './resources/styles';

const SAVED_LABEL = 'Saved to your schedule';
const ADD_LABEL = 'Add to my schedule';

class AddToScheduleButton extends React.Component {
    static propTypes = {
        isAdded: React.PropTypes.bool,
        onPress: React.PropTypes.func,
        style: View.propTypes.style,
        addedImageSource: React.PropTypes.any
    };
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(props.isAdded ? 1 : 0)
        };
    }

    render() {
        const colors = this.props.isAdded ? ['#4DC7A4', '#66D37A'] : ['#6A6AD5', '#6F86D9'];

        const addOpacity = {
            opacity: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 40]
                })
            }]
        };

        const addOpacityImage = {
            opacity: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 80]
                })
            }]
        };

        const addedOpacity = {
            opacity: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-40, 0]
                })
            }]
        };

        const addedOpacityImage = {
            opacity: this.state.anim.interpolate({
                inputRange: [0.7, 1],
                outputRange: [0, 1]
            }),
            transform: [{
                translateY: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-80, 0]
                })
            }]
        };

        return (
            <TouchableOpacity
                accessibilityLabel={this.props.isAdded ? SAVED_LABEL : ADD_LABEL}
                accessibilityTraits="button"
                onPress={this.props.onPress}
                activeOpacity={0.9}
                style={[Styles.container, this.props.style]}>
                <LinearGradient
                    start={[0.5, 1]} end={[1, 1]}
                    colors={colors}
                    collapsable={false}
                    style={Styles.button}>
                    <View style={{ flex: 1 }}>
                        <View style={Styles.content} collapsable={false}>
                            <Animated.Image
                                source={this.props.addedImageSource || Assets.Added}
                                style={[Styles.icon, addedOpacityImage]}
                            />
                            <Animated.Text style={[Styles.caption, addedOpacity]}>
                                <Text>{SAVED_LABEL.toUpperCase()}</Text>
                            </Animated.Text>
                        </View>
                        <View style={Styles.content}>
                            <Animated.Image
                                source={Assets.Add}
                                style={[Styles.icon, addOpacityImage]}
                            />
                            <Animated.Text style={[Styles.caption, addOpacity]}>
                                <Text>{ADD_LABEL.toUpperCase()}</Text>
                            </Animated.Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAdded !== nextProps.isAdded) {
            const toValue = nextProps.isAdded ? 1 : 0;
            Animated.spring(this.state.anim, { toValue }).start();
        }
    }
}

module.exports = AddToScheduleButton;
