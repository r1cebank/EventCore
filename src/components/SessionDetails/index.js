/* eslint-disable import/no-unresolved */
/* eslint-disable react/prefer-es6-class */
import React from 'react';
import { Animated, Image, View, ScrollView, TouchableOpacity, Navigator } from 'react-native';
import Subscribable from 'Subscribable';
import { Components, Assets, Utils, Colors } from '../../global/globalIncludes';

const { Text } = Components.Text;

import Styles from './resources/styles';
//
// var F8FriendGoing = require('F8FriendGoing');
// var F8SpeakerProfile = require('F8SpeakerProfile');


// var MapView = require('../../common/MapView');

// var {connect} = require('react-redux');
// var {addToSchedule, removeFromScheduleWithPrompt} = require('../../actions');

const SessionDetails = React.createClass({
    mixins: [Subscribable.Mixin],

    propTypes: {
        session: React.PropTypes.object,
        'session.tags': React.PropTypes.string,
        style: View.propTypes.style,
        onShare: React.PropTypes.func,
        isAddedToSchedule: React.PropTypes.bool,
        removeFromScheduleWithPrompt: React.PropTypes.func,
        isLoggedIn: React.PropTypes.bool,
        navigator: React.PropTypes.instanceOf(Navigator),
        addToSchedule: React.PropTypes.func,
        sharedSchedule: React.PropTypes.any
    },

    getInitialState() {
        return {
            scrollTop: new Animated.Value(0)
        };
    },

    render() {
        // var speakersProfiles = this.props.session.speakers.map(
        //   (speaker) => (
        //     <F8SpeakerProfile
        //       key={speaker.name}
        //       speaker={speaker}
        //     />
        //   )
        // );

        let topicsSubtitle = null;
        const { topics } = this.props.session;
        if (topics && topics.length > 0) {
            topicsSubtitle = (
                <Text style={Styles.topics}>
                TOPICS: {topics.join(', ')}
                </Text>
            );
        }

        // var friendsGoing = this.props.friendsGoing.map(
        //   (friend) => (
        //     <F8FriendGoing
        //       key={friend.id}
        //       friend={friend}
        //       onPress={() => this.props.navigator.push({friend})}
        //     />
        //   )
        // );

        let inlineMap;
        // if (this.props.map) {
        //   inlineMap = <MapView map={this.props.map} />;
        // }

        const locationColor = Colors.colorForKey(this.props.session.location);
        let locationTitle = '';
        if (this.props.session.location) {
            locationTitle = this.props.session.location.toUpperCase();
        }
        const location = (
            <Text style={[Styles.location, { color: locationColor }]}>
                {locationTitle}
                <Text style={Styles.time}>
                    {locationTitle && ' - '}
                    {Utils.FormatDuration(this.props.session.startTime, this.props.session.endTime)}
                </Text>
            </Text>
        );

        const title = this.props.session.title || '';

        return (
            <View style={[Styles.container, this.props.style]}>
                <ScrollView
                    contentContainerStyle={Styles.contentContainer}
                    onScroll={
                        ({ nativeEvent }) =>
                            this.state.scrollTop.setValue(nativeEvent.contentOffset.y)
                    }
                    scrollEventThrottle={100}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}>
                    {location}
                    <Text style={Styles.title}>
                        {title}
                    </Text>
                    <Text style={Styles.description}>
                        {this.props.session.description}
                    </Text>
                    <Components.Section>
                        {topicsSubtitle}
                    </Components.Section>
                    {/* <Section>
                        {speakersProfiles}
                        </Section>
                        <Section title="Friends Going">
                        {friendsGoing}
                        </Section> */}
                        {inlineMap}
                    <TouchableOpacity
                    accessibilityLabel="Share this session"
                    accessibilityTraits="button"
                    onPress={this.props.onShare}
                    style={Styles.shareButton}>
                        <Image source={Assets.Share} />
                    </TouchableOpacity>
                </ScrollView>
                <View style={Styles.actions}>
                    <Components.AddToScheduleButton
                    addedImageSource={Assets.React}
                    isAdded={this.props.isAddedToSchedule}
                    onPress={this.toggleAdded}
                    />
                </View>
                <Animated.View
                style={[Styles.miniHeader,
                    {
                        opacity: this.state.scrollTop.interpolate({
                            inputRange: [0, 150, 200],
                            outputRange: [0, 0, 1],
                            extrapolate: 'clamp'
                        })
                    }
                ]}>
                    <Text numberOfLines={1} style={Styles.miniTitle}>
                        {title}
                    </Text>
                    {location}
                </Animated.View>
            </View>
        );
    },

    toggleAdded() {
        if (this.props.isAddedToSchedule) {
            this.props.removeFromScheduleWithPrompt();
        } else {
            this.addToSchedule();
        }
    },

    addToSchedule() {
        if (!this.props.isLoggedIn) {
            this.props.navigator.push({
                login: true, // TODO: Proper route
                callback: this.addToSchedule
            });
        } else {
            this.props.addToSchedule();
            if (this.props.sharedSchedule === null) {
                setTimeout(() => this.props.navigator.push({ share: true }), 1000);
            }
        }
    }
});

// function select(store, props) {
//   const sessionID = props.session.id;
//   const friendsGoing = store.friendsSchedules.filter((friend) => friend.schedule[sessionID]);
//   const map = store.maps.find(({name}) => name === props.session.location);
//
//   return {
//     isAddedToSchedule: !!store.schedule[props.session.id],
//     isLoggedIn: store.user.isLoggedIn,
//     sharedSchedule: store.user.sharedSchedule,
//     sessionURLTemplate: store.config.sessionURLTemplate,
//     topics: store.topics,
//     friendsGoing,
//     map,
//   };
// }
//
// function actions(dispatch, props) {
//   let id = props.session.id;
//   return {
//     addToSchedule: () => dispatch(addToSchedule(id)),
//     removeFromScheduleWithPrompt:
//       () => dispatch(removeFromScheduleWithPrompt(props.session)),
//   };
// }

module.exports = SessionDetails;
// module.exports = connect(select, actions)(F8SessionDetails);
