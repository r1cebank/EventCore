/* eslint-disable import/no-unresolved */
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './resources/styles';

class Section extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        children: React.PropTypes.any
    };

    render() {
        const { children } = this.props;
        if (React.Children.count(children) === 0) {
            return null;
        }
        let header;
        if (this.props.title) {
            header = (
                <View style={Styles.sectionHeader}>
                    <Text style={Styles.sectionTitle}>
                        {this.props.title.toUpperCase()}
                    </Text>
                    <LinearGradient
                    start={[0, 0]} end={[1, 0]}
                    colors={['#E1E1E1', 'white']}
                    style={Styles.line}
                    />
                </View>
            );
        }
        return (
            <View style={Styles.section}>
                {header}
                {children}
            </View>
        );
    }
}

module.exports = Section;
