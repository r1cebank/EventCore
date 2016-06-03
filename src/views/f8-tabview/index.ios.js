import React from 'react';
import { TabBarIOS } from 'react-native';

import { Assets, Views, Colors, Icons, Defaults } from '../../global/global-includes';

// Global Actions
import * as Actions from '../../state/actions/navigation';

import { connect } from 'react-redux';

class F8TabsView extends React.Component {

    // componentDidMount() {
    //     StatusBar.setBarStyle('light-content');
    // }

    static propTypes = {
        navigation: React.PropTypes.object,
        tab: React.PropTypes.string,
        onTabSelect: React.PropTypes.func
    };

    // constructor(props) {
    //     super(props);
    //     this.onDayChange = this.onDayChange.bind(this);
    // }

    onTabSelect(tab)  {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    // onDayChange(day) {
    //     this.props.onDayChange(day);
    // }

    render() {
        let Icon = Icons[this.props.navigation.data.config.iconsource];
        let isLocalIcon = false;
        // If Icon become undefined, use default
        if (!Icon) {
            Icon = Icons.Ionicons;
        }
        if (this.props.navigation.data.config.iconsource === 'Local') {
            isLocalIcon = true;
            // If we a using Local icons, overwrite this object to include TabBarIOS
            Icon = { };
            Icon.TabBarItemIOS = TabBarIOS.Item;
        }
        return (
            <TabBarIOS tintColor={Colors.darkText}>
                {this.props.navigation.data.pages.map((navItem, index) =>
                    <Icon.TabBarItemIOS
                      selected={this.props.tab === navItem.name}
                      title={navItem.title}
                      key={index}
                      onPress={() => { this.onTabSelect(navItem.name); }}
                      icon={isLocalIcon ? Assets[navItem.icon] : undefined}
                      selectedIcon={isLocalIcon ? Assets[navItem.selectedIcon] : undefined}
                      iconName={navItem.icon}
                      selectedIconName={navItem.selectedIcon}>
                        {(() => {
                            let ComponentView = Views[navItem.view];
                            // If the component is missing, fallback to default with message
                            if (!ComponentView) {
                                const warningText = `View ${navItem.view} not found`;
                                return <Defaults.warningView warningText={warningText} />;
                            }
                            return <ComponentView title={navItem.title} navigator={this.props.navigator} />;
                        })()}
                    </Icon.TabBarItemIOS>
                )}
            </TabBarIOS>
        );
    }

}

function select(store) {
    return {
        navigation: store.data.navigation,
        tab: store.navigationstate.tab
        // day: store.navigationstate.day
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(Actions.switchNavigation(tab))
        // onDayChange: (day) => dispatch(Actions.switchDay(day))
    };
}

module.exports = connect(select, actions)(F8TabsView);
// module.exports = F8TabsView;
