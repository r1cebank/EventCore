import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Animated, Image, View, ScrollView, TouchableOpacity, PixelRatio } from 'react-native';
import Subscribable from 'Subscribable';
import { Components, Assets, Utils, Colors } from '../../global/globalIncludes';

const { Text } = Components.Text;
//
// var F8FriendGoing = require('F8FriendGoing');
// var F8SpeakerProfile = require('F8SpeakerProfile');


// var MapView = require('../../common/MapView');

var StyleSheet = require('StyleSheet');

// var {connect} = require('react-redux');
// var {addToSchedule, removeFromScheduleWithPrompt} = require('../../actions');

var SessionDetails = React.createClass({
  mixins: [Subscribable.Mixin],

  getInitialState: function() {
    return {
      scrollTop: new Animated.Value(0),
    };
  },

  render: function() {
    // var speakersProfiles = this.props.session.speakers.map(
    //   (speaker) => (
    //     <F8SpeakerProfile
    //       key={speaker.name}
    //       speaker={speaker}
    //     />
    //   )
    // );

    var topics = null;
    var {tags} = this.props.session;
    if (tags && tags.length > 0) {
      topics = (
        <Text style={styles.topics}>
          TOPICS: {tags.join(', ')}
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

    var inlineMap;
    // if (this.props.map) {
    //   inlineMap = <MapView map={this.props.map} />;
    // }

    var locationColor = Colors.colorForKey(this.props.session.location);
    var locationTitle = this.props.session.location && this.props.session.location.toUpperCase();
    var location = (
      <Text style={[styles.location, {color: locationColor}]}>
        {locationTitle}
        <Text style={styles.time}>
          {locationTitle && ' - '}
          {Utils.FormatDuration(this.props.session.startTime, this.props.session.endTime)}
        </Text>
      </Text>
    );

    var title = this.props.session.title || '';
    var isReactTalk = title.indexOf('React') > -1;

    return (
      <View style={[styles.container, this.props.style]}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          onScroll={({nativeEvent}) => this.state.scrollTop.setValue(nativeEvent.contentOffset.y)}
          scrollEventThrottle={100}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}>
          {location}
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>
            {this.props.session.description}
          </Text>
          <Section>
            {topics}
          </Section>
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
            style={styles.shareButton}>
            <Image source={Assets.Share} />
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.actions}>
          <Components.AddToScheduleButton
            addedImageSource={isReactTalk && Assets.React}
            isAdded={this.props.isAddedToSchedule}
            onPress={this.toggleAdded}
          />
        </View>
        <Animated.View style={[
          styles.miniHeader,
          {
            opacity: this.state.scrollTop.interpolate({
              inputRange: [0, 150, 200],
              outputRange: [0, 0, 1],
              extrapolate: 'clamp',
            })
          }
        ]}>
          <Text numberOfLines={1} style={styles.miniTitle}>
            {title}
          </Text>
          {location}
        </Animated.View>
      </View>
    );
  },

  toggleAdded: function() {
    if (this.props.isAddedToSchedule) {
      this.props.removeFromScheduleWithPrompt();
    } else {
      this.addToSchedule();
    }
  },

  addToSchedule: function() {
    if (!this.props.isLoggedIn) {
      this.props.navigator.push({
        login: true, // TODO: Proper route
        callback: this.addToSchedule,
      });
    } else {
      this.props.addToSchedule();
      if (this.props.sharedSchedule === null) {
        setTimeout(() => this.props.navigator.push({share: true}), 1000);
      }
    }
  },
});

class Section extends React.Component {
  props: {
    title: string;
    children: any;
  };

  render() {
    var {children} = this.props;
    if (React.Children.count(children) === 0) {
      return null;
    }
    var header;
    if (this.props.title) {
      header = (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {this.props.title.toUpperCase()}
          </Text>
          <LinearGradient
            start={[0, 0]} end={[1, 0]}
            colors={['#E1E1E1', 'white']}
            style={styles.line}
          />
        </View>
      );
    }
    return (
      <View style={styles.section}>
        {header}
        {children}
      </View>
    );
  }
}

var PADDING = 15;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 26,
    paddingBottom: 60,
  },
  miniHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 12,
    top: 0,
    right: 12,
    paddingVertical: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#E1E1E1',
  },
  miniTitle: {
    fontSize: 12,
    flex: 1,
    color: Colors.darkText,
  },
  location: {
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 32,
    marginVertical: 20,
  },
  time: {
    color: Colors.lightText,
    marginBottom: 20,
  },
  description: {
    fontSize: 17,
    lineHeight: 25,
  },
  topics: {
    fontSize: 12,
    color: Colors.lightText,
  },
  section: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  sectionTitle: {
    color: Colors.lightText,
    marginRight: 14,
    fontSize: 12,
  },
  line: {
    height: 1 / PixelRatio.get(),
    backgroundColor: Colors.lightText,
    flex: 1,
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    margin: 10,
    paddingVertical: 10,
    borderTopColor: '#eeeeee',
    backgroundColor: 'white',
  },
  shareButton: {
    backgroundColor: 'transparent',
    padding: PADDING,
    position: 'absolute',
    right: 0,
    top: 0,
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
