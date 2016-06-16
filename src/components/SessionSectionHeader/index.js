/* eslint-disable import/no-unresolved */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './resources/styles';
import { Components } from '../../global/globalIncludes';

const { Text } = Components.Text;

class SessionSectionHeader extends React.Component {
    props: {
        title: string;
    };

    render() {
        return (
            <LinearGradient colors={['#F4F6F7', '#EBEEF1']} style={Styles.header}>
                <Text style={Styles.label}>
                    {this.props.title}
                </Text>
            </LinearGradient>
        );
    }
}

module.exports = SessionSectionHeader;
