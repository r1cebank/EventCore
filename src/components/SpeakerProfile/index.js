import React from 'react';
import { Image, View } from 'react-native';
import { Components } from '../../global/globalIncludes';

const { Text } = Components.Text;

import Styles from './resources/styles';

class SpeakerProfile extends React.Component {
    static propTypes = {
        speaker: React.PropTypes.object
    };
    render() {
        const speaker = this.props.speaker;
        return (
            <View style={Styles.row}>
                <Image style={Styles.picture} source={{ uri: speaker.picture }} />
                <View style={Styles.info}>
                    <Text style={Styles.name}>{speaker.name}</Text>
                    <Text style={Styles.title}>{speaker.title}</Text>
                </View>
            </View>
        );
    }
}

module.exports = SpeakerProfile;
