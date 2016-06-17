import React from 'react';
import { TabBarIOS, Navigator, StatusBar } from 'react-native';

import { Assets, Views, Colors, Icons, Defaults, Actions } from '../../global/globalIncludes';

import { connect } from 'react-redux';

class TabView extends React.Component {

    static propTypes = {
        navigation: React.PropTypes.object,
        tab: React.PropTypes.string,
        onTabSelect: React.PropTypes.func,
        navigator: React.PropTypes.instanceOf(Navigator)
    };

    componentDidMount() {
        StatusBar.setBarStyle('light-content');
    }

    // constructor(props) {
    //     super(props);
    // }

    onTabSelect(tab)  {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
    }

    render() {
        let Icon = Icons[this.props.navigation.config.iconsource];
        let isLocalIcon = false;
        // If Icon become undefined, use default
        if (!Icon) {
            Icon = Icons.Ionicons;
        }
        if (this.props.navigation.config.iconsource === 'Local') {
            isLocalIcon = true;
            // If we a using Local icons, overwrite this object to include TabBarIOS
            Icon = { };
            Icon.TabBarItemIOS = TabBarIOS.Item;
        }
        return (
            <TabBarIOS tintColor={Colors.darkText}>
                {this.props.navigation.pages.map((navItem, index) =>
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
                            return (
                                <ComponentView
                                    title={navItem.title}
                                    navigator={this.props.navigator} />
                            );
                        })()}
                    </Icon.TabBarItemIOS>
                )}
            </TabBarIOS>
        );
    }

}

function select(store) {
    return {
        navigation: store.data.navigation.data,
        tab: store.navigation.tab
    };
}

function actions(dispatch) {
    return {
        onTabSelect: (tab) => dispatch(Actions.Navigation.switchNavigation(tab))
    };
}

module.exports = connect(select, actions)(TabView);
