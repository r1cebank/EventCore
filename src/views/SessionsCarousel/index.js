import React from 'react';
import { Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import Styles from './resources/styles';
import { Views, Components, Colors, Icons, Defaults, Assets, Utils } from '../../global/globalIncludes';

class SessionsCarusel extends React.Component {

    constructor(props: Props) {
        super(props);

        var flatSessionsList = [];
        var contexts: Array<Context> = [];
        var allSessions = this.props.allSessions;
        if (!allSessions) {
            const {session} = this.props;
            allSessions = {
                [Utils.FormatTime(session.startTime)]: {[session.id]: session}
            };
        }

        // TODO: Add test
        for (let sectionID in allSessions) {
            const sectionLength = Object.keys(allSessions[sectionID]).length;
            let rowIndex = 0;
            for (let sessionID in allSessions[sectionID]) {
                const session = allSessions[sectionID][sessionID];
                flatSessionsList.push(session);
                contexts.push({
                    rowIndex,
                    sectionLength,
                    sectionTitle: sectionID,
                });
                rowIndex++;
            }
        }

        const selectedIndex = flatSessionsList.findIndex((s) => s.id === this.props.session.id);
        if (selectedIndex === -1) {
            console.log(this.props.session);
            console.log(flatSessionsList);
        }

        this.state = {
            day: this.props.session.day,
            count: flatSessionsList.length,
            selectedIndex,
            flatSessionsList,
            contexts,
        };
        (this: any).dismiss = this.dismiss.bind(this);
        (this: any).handleIndexChange = this.handleIndexChange.bind(this);
        (this: any).renderCard = this.renderCard.bind(this);
        (this: any).shareCurrentSession = this.shareCurrentSession.bind(this);
    }

    render() {
        var {rowIndex, sectionLength, sectionTitle} = this.state.contexts[this.state.selectedIndex];
        var rightItem;
        if (Platform.OS === 'android') {
            rightItem = {
                title: 'Share',
                icon: Assets.Share,
                onPress: this.shareCurrentSession,
            };
        }
        return (
            <View style={Styles.container}>
                <Components.Header
                    style={Styles.header}
                    leftItem={{
                        layout: 'icon',
                        title: 'Close',
                        icon: Assets.BackWhite,
                        onPress: this.dismiss,
                    }}
                    rightItem={rightItem}>
                    <View style={Styles.headerContent}>
                        <Text style={Styles.title}>
                            <Text style={Styles.day}>DAY {this.state.day}</Text>
                                {'\n'}
                            <Text style={Styles.time}>{sectionTitle}</Text>
                        </Text>
                        <Components.PageControl
                            count={sectionLength}
                            selectedIndex={rowIndex}
                        />
                    </View>
                    </Components.Header>
                <Components.Carousel
                    count={this.state.count}
                    selectedIndex={this.state.selectedIndex}
                    onSelectedIndexChange={this.handleIndexChange}
                    renderCard={this.renderCard}
                />
            </View>
        );
    }

    renderCard(index: number): ReactElement {
        return (
            <Components.SessionDetails
                style={Styles.card}
                navigator={this.props.navigator}
                session={this.state.flatSessionsList[index]}
                onShare={this.shareCurrentSession}
            />
        );
    }

    shareCurrentSession() {
        const session = this.state.flatSessionsList[this.state.selectedIndex];
        this.props.dispatch(shareSession(session));
    }

    componentDidMount() {
        // this.track(this.state.selectedIndex);
        // this.props.dispatch(loadFriendsSchedules());
    }

    dismiss() {
        this.props.navigator.pop();
    }

    handleIndexChange(selectedIndex: number) {
        // this.track(selectedIndex);
        // this.setState({ selectedIndex });
    }

    // track(index: number) {
    //     const {id} = this.state.flatSessionsList[index];
    //     Parse.Analytics.track('view', {id});
    //     AppEventsLogger.logEvent('View Session', 1, {id});
    // }
};

module.exports = SessionsCarusel;
