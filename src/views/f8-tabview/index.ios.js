import React from 'react';
import { StatusBarIOS, TabBarIOS, Navigator, View } from 'react-native';

import { connect } from 'react-redux';

class F8TabsView extends React.Component {

    constructor(props) {
        super(props);
        this.handleDayChange = this.handleDayChange.bind(this);
    }

    componentDidMount() {
        StatusBarIOS && StatusBarIOS.setStyle('light-content');
    }

    render() {
        const scheduleIcon = this.props.day === 1
        ? require('./schedule/img/schedule-icon-1.png')
        : require('./schedule/img/schedule-icon-2.png');
        const scheduleIconSelected = this.props.day === 1
        ? require('./schedule/img/schedule-icon-1-active.png')
        : require('./schedule/img/schedule-icon-2-active.png');
        return (
            <TabBarIOS tintColor="#032250">
                <TabBarIOS.Item
                  title="Schedule"
                  icon={scheduleIcon}
                  selectedIcon={scheduleIconSelected}>
                  <View />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    handleDayChange(day) {
        this.setState({selectedDay: day});
    }

}

// function select(store) {
//     return {
//         tab: store.navigation.tab,
//         day: store.navigation.day,
//         notificationsBadge: unseenNotificationsCount(store) + store.surveys.length,
//     };
// }

// function actions(dispatch) {
//     return {
//         onTabSelect: (tab) => dispatch(switchTab(tab)),
//     };
// }

// module.exports = connect(select, actions)(F8TabsView);
module.exports = F8TabsView;
