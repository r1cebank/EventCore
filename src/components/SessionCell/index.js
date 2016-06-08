import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';

import Styles from './resources/styles';
import { Components, Assets, Utils, Colors } from '../../global/globalIncludes';

const { Text } = Components.Text;
const formatTime = Utils.FormatTime;
const formatDuration = Utils.FormatDuration;

class SessionCell extends React.Component {
    render() {
        var session = this.props.session;
        var tick;
        if (this.props.showTick) {
            tick = <Image style={Styles.added} source={Assets.AddedCell} />;
        }
        var time;
        if (this.props.showStartEndTime) {
            time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
        } else {
            time = formatDuration(session.startTime, session.endTime);
        }
        var location = session.location && session.location.toUpperCase();
        var locationColor = Colors.colorForKey(location);
        var cell = (
            <View style={[Styles.cell, this.props.style]}>
                <View style={Styles.titleSection}>
                    <Text numberOfLines={2} style={Styles.titleText}>
                        {session.title}
                    </Text>
                </View>
                <Text numberOfLines={1} style={Styles.duration}>
                    <Text style={[Styles.locationText, {color: locationColor}]}>
                        {location}
                    </Text>
                    {location && ' - '}
                    {time}
                </Text>
                {tick}
            </View>
        );

        if (this.props.onPress) {
            cell =
            <Components.Touchable onPress={this.props.onPress}>
            {cell}
            </Components.Touchable>;
        }

        return cell;
    }
}

// function select(store, props) {
//     return {
//         showTick: !!store.schedule[props.session.id]
//     };
// }

// module.exports = connect(select)(F8SessionCell);

module.exports = SessionCell;
