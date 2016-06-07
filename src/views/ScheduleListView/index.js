// var FilterSessions = require('./filterSessions');

// var groupSessions = require('./groupSessions');

import React from 'react';
import { View } from 'react-native';
import { Views, Components, Colors, Icons, Defaults, Assets } from '../../global/globalIncludes';

// import type {Session} from '../../reducers/sessions';

class ScheduleListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todaySessions: [{title: 'Test'}],
        };

        this._innerRef = null;

        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderEmptyList = this.renderEmptyList.bind(this);
        this.storeInnerRef = this.storeInnerRef.bind(this);
    }

    // componentWillReceiveProps(nextProps: Props) {
    //     if (nextProps.sessions !== this.props.sessions ||
    //         nextProps.day !== this.props.day) {
    //             this.setState({
    //                 todaySessions: groupSessions(FilterSessions.byDay(nextProps.sessions, nextProps.day)),
    //             });
    //         }
    //     }

        render() {
            return (
                <Views.PureListView
                    ref={this.storeInnerRef}
                    data={this.state.todaySessions}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    {...this.props}
                    renderEmptyList={this.renderEmptyList}
                />
            );
        }

        renderSectionHeader(sectionData: any, sectionID: string) {
            return <Components.SessionSectionHeader title={sectionID} />;
        }

        renderRow(session: Session, day: number) {
            return (
                <Components.SessionCell
                onPress={() => this.openSession(session, day)}
                session={session}
                />
            );
        }

        renderEmptyList(): ?ReactElement {
            const {renderEmptyList} = this.props;
            return renderEmptyList && renderEmptyList(this.props.day);
        }

        openSession(session: Session, day: number) {
            this.props.navigator.push({
                day,
                session,
                allSessions: this.state.todaySessions,
            });
        }

        storeInnerRef(ref) {
            this._innerRef = ref;
        }

        scrollTo(...args: Array<any>) {
            this._innerRef && this._innerRef.scrollTo(...args);
        }

        getScrollResponder(): any {
            return this._innerRef && this._innerRef.getScrollResponder();
        }
    }

    module.exports = ScheduleListView;
