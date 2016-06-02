import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Styles from './resources/styles';
import { Components } from '../../global/global-includes';

class SessionsSectionHeader extends React.Component {
    props: {
        title: string;
    };

    render() {
        return (
            <LinearGradient colors={['#F4F6F7', '#EBEEF1']} style={Styles.header}>
                <Components.F8Text style={Styles.label}>
                {this.props.title}
                </Components.F8Text>
            </LinearGradient>
        );
    }
}

module.exports = SessionsSectionHeader;
