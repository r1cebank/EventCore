import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';

import Styles from './resources/styles';
import { Components, Assets } from '../../global/global-includes';

class F8SessionCell extends React.Component {
    render() {
        var session = this.props.session;
        var tick;
        if (this.props.showTick) {
            tick =
            <Image style={Styles.added} source={Assets.AddedCell} />;
        }
        var time;
        if (this.props.showStartEndTime) {
            time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
        } else {
            time = formatDuration(session.startTime, session.endTime);
        }
        var location = session.location && session.location.toUpperCase();
        var locationColor = F8Colors.colorForLocation(location);
        var cell =
        <View style={[Styles.cell, this.props.style]}>
        <View style={Styles.titleSection}>
        <Components.F8Text numberOfLines={2} style={Styles.titleText}>
        {session.title}
        </Components.F8Text>
        </View>
        <Components.F8Text numberOfLines={1} style={Styles.duration}>
        <Components.F8Text style={[Styles.locationText, {color: locationColor}]}>
        {location}
        </Components.F8Text>
        {location && ' - '}
        {time}
        </Components.F8Text>
        {tick}
        </View>;

        if (this.props.onPress) {
            cell =
            <Components.Touchable onPress={this.props.onPress}>
            {cell}
            </Components.Touchable>;
        }

        return cell;
    }
}

function select(store, props) {
    return {
        showTick: !!store.schedule[props.session.id]
    };
}

module.exports = connect(select)(F8SessionCell);
