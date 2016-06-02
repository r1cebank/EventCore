import { Views, Components, Colors, Icons, Defaults, Assets } from '../../global/global-includes';

// var FilterSessions = require('./filterSessions');

import { Platform } from 'react-native';
import React from 'react';

// var FilterScreen = require('../../filter/FilterScreen');

import { createSelector } from 'reselect';

const data = createSelector(
    (store) => store.sessions,
    (store) => store.filter
    // (sessions, filter) => FilterSessions.byTopics(sessions, filter),
);


class GeneralScheduleView extends React.Component {
    _drawer: ?Components.DrawerLayout;

    constructor(props) {
        super(props);

        this.renderEmptyList = this.renderEmptyList.bind(this);
        this.switchDay = this.switchDay.bind(this);
        this.openFilterScreen = this.openFilterScreen.bind(this);
        this.renderNavigationView = this.renderNavigationView.bind(this);
    }

    render() {
        const filterItem = {
            icon: Assets.Filter,
            title: 'Filter',
            onPress: this.openFilterScreen
        };

        const filterHeader = Object.keys(this.props.filter).length > 0
        ? <Components.FilterHeader />
        : null;

        const content = (
            <Components.ListContainer
            title="Schedule"
            selectedSegment={this.props.day - 1}
            onSegmentChange={this.switchDay}
            backgroundImage={Assets.ScheduleBackground}
            backgroundColor="#5597B8"
            selectedSectionColor="#51CDDA"
            stickyHeader={filterHeader}
            rightItem={filterItem}>
                <Views.ScheduleListView
                title="Day 1"
                day={1}
                sessions={this.props.sessions}
                renderEmptyList={this.renderEmptyList}
                navigator={this.props.navigator}
                />
                <Views.ScheduleListView
                title="Day 2"
                day={2}
                sessions={this.props.sessions}
                renderEmptyList={this.renderEmptyList}
                navigator={this.props.navigator}
                />
            </Components.ListContainer>
        );

        if (Platform.OS === 'ios') {
            return content;
        }
        return (
            <Components.DrawerLayout
            ref={(drawer) => this._drawer = drawer}
            drawerWidth={300}
            drawerPosition="right"
            renderNavigationView={this.renderNavigationView}>
            {content}
            </Components.DrawerLayout>
        );
    }

    renderNavigationView() {
        return <FilterScreen onClose={() => this._drawer && this._drawer.closeDrawer()} />;
    }

    renderEmptyList(day: number) {
        return (
            <Views.EmptySchedule
            title={`No sessions on day ${day} match the filter`}
            text="Check the schedule for the other day or remove the filter."
            />
        );
    }

    openFilterScreen() {
        if (Platform.OS === 'ios') {
            this.props.navigator.push({ filter: 123 });
        } else {
            this._drawer && this._drawer.openDrawer();
        }
    }

    switchDay(page) {
        this.props.switchDay(page + 1);
    }
}

function select(store) {
    return {
        day: store.navigation.day,
        filter: store.filter,
        sessions: data(store),
    };
}

function actions(dispatch) {
    return {
        switchDay: (day) => dispatch(switchDay(day)),
    };
}

module.exports = GeneralScheduleView;
// module.exports = connect(select, actions)(GeneralScheduleView);
