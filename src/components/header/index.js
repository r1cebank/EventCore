import React from 'react';
import { Platform, TouchableOpacity, View, Image, ToolbarAndroid } from 'react-native';
import { Views, Components, Colors, Icons, Defaults, Utils, Assets } from '../../global/global-includes';

const { Text } = Components.F8Text;

import Styles from './resources/styles';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

class F8HeaderAndroid extends React.Component {
    render() {
        const {leftItem, rightItem, extraItems} = this.props;
        let actions = [];
        if (rightItem) {
            const {title, icon, layout} = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always',
            });
        }
        if (extraItems) {
            actions = actions.concat(extraItems.map((item) => ({
                title: item.title,
                show: 'never',
            })));
        }

        const textColor = this.props.foreground === 'dark'
        ? Colors.darkText
        : 'white';

        let content;
        if (React.Children.count(this.props.children) > 0) {
            content = (
                <View collapsable={false} style={{flex: 1}}>
                {this.props.children}
                </View>
            );
        }

        return (
            <View style={[Styles.toolbarContainer, this.props.style]}>
            <ToolbarAndroid
            navIcon={leftItem && leftItem.icon}
            onIconClicked={leftItem && leftItem.onPress}
            title={this.props.title}
            titleColor={textColor}
            subtitleColor={textColor}
            actions={actions}
            onActionSelected={this.handleActionSelected.bind(this)}
            style={Styles.toolbar}>
            {content}
            </ToolbarAndroid>
            </View>
        );
    }

    handleActionSelected(position: number) {
        let items = this.props.extraItems || [];
        if (this.props.rightItem) {
            items = [this.props.rightItem, ...items];
        }
        const item = items[position];
        item && item.onPress && item.onPress();
    }
}


class F8HeaderIOS extends React.Component {
    props: Props;

    render() {
        const {leftItem, title, rightItem, foreground} = this.props;
        const titleColor = foreground === 'dark' ? Colors.darkText : 'white';
        const itemsColor = foreground === 'dark' ? Colors.lightText : 'white';

        const content = React.Children.count(this.props.children) === 0
        ? <Text style={[Styles.titleText, {color: titleColor}]}>
            {title}
        </Text>
        : this.props.children;
        return (
            <View style={[Styles.header, this.props.style]}>
                <View style={Styles.leftItem}>
                    <ItemWrapperIOS color={itemsColor} item={leftItem} />
                </View>
                <View
                accessible={true}
                accessibilityLabel={title}
                accessibilityTraits="header"
                style={Styles.centerItem}>
                    {content}
                </View>
                <View style={Styles.rightItem}>
                    <ItemWrapperIOS color={itemsColor} item={rightItem} />
                </View>
            </View>
        );
    }

}

class ItemWrapperIOS extends React.Component {
    render() {
        const {item, color} = this.props;
        if (!item) {
            return null;
        }

        let content;
        const {title, icon, layout, onPress} = item;

        if (layout !== 'icon' && title) {
            content = (
                <Text style={[Styles.itemText, {color}]}>
                    {title.toUpperCase()}
                </Text>
            );
        } else if (icon) {
            content = <Image source={icon} />;
        }

        return (
            <TouchableOpacity
            accessibilityLabel={title}
            accessibilityTraits="button"
            onPress={onPress}
            style={Styles.itemWrapper}>
            {content}
            </TouchableOpacity>
        );
    }
}

const Header = Platform.OS === 'ios' ? F8HeaderIOS : F8HeaderAndroid;
Header.height = HEADER_HEIGHT;

module.exports = Header;
// module.exports.__cards__ = (define) => {
//     const menuItem = {
//         title: 'Menu',
//         icon: require('./img/hamburger.png'),
//         onPress: () => alert('Menu button pressed!'),
//     };
//     const filterItem = {
//         title: 'Filter',
//         icon: require('./img/filter.png'),
//         onPress: () => alert('Filter button pressed!'),
//     };
//
//     define('Simple', () => <Header title="Hello, world" />);
//     define('With items', () => (
//         <Header
//         title="Default"
//         leftItem={menuItem}
//         rightItem={filterItem}
//         />
//     ));
//     define('Forcing icons', () => (
//         <Header
//         title="Forcing icons"
//         leftItem={{...menuItem, layout: 'icon'}}
//         rightItem={{...filterItem, layout: 'icon'}}
//         />
//     ));
//     define('Forcing title', () => (
//         <Header
//         title="Forcing title"
//         leftItem={{...menuItem, layout: 'title'}}
//         rightItem={{...filterItem, layout: 'title'}}
//         />
//     ));
//     define('With content', () => (
//         <Header leftItem={menuItem}>
//         <View style={{backgroundColor: '#224488'}}>
//         <Text style={{color: 'yellow'}}>
//         Yellow text as title
//         </Text>
//         </View>
//         </Header>
//     ));
//     define('With Background', () => (
//         <Header
//         title="With Background"
//         leftItem={{...menuItem, layout: 'title'}}
//         rightItem={{...filterItem, layout: 'title'}}
//         style={{backgroundColor: '#224488'}}
//         />
//     ));
//     define('With light background', () => (
//         <Header
//         title="Light Background"
//         leftItem={{...menuItem, layout: 'title'}}
//         rightItem={{...filterItem, layout: 'title'}}
//         style={{backgroundColor: 'white'}}
//         foreground="dark"
//         />
//     ));
// };
