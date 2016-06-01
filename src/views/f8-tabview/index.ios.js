import React from 'react';
import { StatusBar, TabBarIOS, Navigator, View } from 'react-native';

import { Views, Colors, Icons } from '../../global/global-includes';

import { connect } from 'react-redux';

class F8TabsView extends React.Component {

    constructor(props) {
        Icons;
        super(props);
    }

    componentDidMount() {
        StatusBar && StatusBar.setBarStyle('light-content');
    }

    onTabSelect(tab: Tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    render() {
        // Later replaced with configurable icons
        const Icon = Icons.Ionicons;
        return (
            <TabBarIOS tintColor={Colors.darkText}>
                <Icon.TabBarItemIOS
                  selected={this.props.tab === 'schedule'}
                  title="Schedule"
                  iconName="ios-home-outline"
                  selectedIconName="ios-home">
                  <Views.card navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                  selected={this.props.tab === 'schedule2'}
                  title="Schedule2"
                  iconName="ios-person-outline"
                  selectedIconName="ios-person">
                  <Views.card navigator={this.props.navigator} />
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }

}

function select(store) {
    return {
        navigation: store.data.navigation,
        tab: store.navigationstate.tab
    };
}

function actions(dispatch) {
    return {
        // onTabSelect: (tab) => dispatch(switchTab(tab)),
    };
}

module.exports = connect(select, actions)(F8TabsView);
// module.exports = F8TabsView;
