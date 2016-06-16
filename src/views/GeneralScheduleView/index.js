import React from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';

import * as Actions from '../../state/actions/navigation';
import { Views, Components, Assets, Utils } from '../../global/globalIncludes';

class GeneralScheduleView extends React.Component {

    static propTypes = {
        title: React.PropTypes.string,
        agenda: React.PropTypes.object,
        navigator: React.PropTypes.instanceOf(Navigator),
        switchDay: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.renderEmptyList = this.renderEmptyList.bind(this);
        this.switchDay = this.switchDay.bind(this);
    }

    render() {
        const filterItem = {
            icon: Assets.Filter,
            title: 'Filter',
            onPress: this.openFilterScreen
        };

        const filterHeader = Object.keys({}).length > 0
        ? <Components.FilterHeader />
        : null;

        const content = (
            <Components.ListContainer
                title={this.props.title}
                selectedSegment={0}
                onSegmentChange={this.switchDay}
                backgroundImage={Assets.ScheduleBackground}
                backgroundColor="#5597B8"
                selectedSectionColor="#51CDDA"
                stickyHeader={filterHeader}
                rightItem={filterItem}>
                {this.props.agenda.days.map((day, index) =>
                    <Views.ScheduleListView
                        title={day.label}
                        day={1}
                        key={index}
                        sessions={Utils.FilterSessions(this.props.agenda.agenda, day.query)}
                        renderEmptyList={this.renderEmptyList}
                        navigator={this.props.navigator}
                    />
                )}
            </Components.ListContainer>
        );

        return content;
    }

    renderEmptyList(day: number) {
        return (
            <Views.EmptyScheduleView
                title={`No sessions on day ${day} match the filter`}
                text="Check the schedule for the other day or remove the filter."
            />
        );
    }

    switchDay(page) {
        this.props.switchDay(page + 1);
    }
}

function select(store) {
    return {
        day: store.navigation.day,
        agenda: store.data.agenda.data
    };
}

function actions(dispatch) {
    return {
        switchDay: (day) => dispatch(Actions.switchDay(day))
    };
}

module.exports = connect(select, actions)(GeneralScheduleView);
