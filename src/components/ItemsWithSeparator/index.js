import React from 'react';
import { View } from 'react-native';

import Styles from './resources/styles';


class ItemsWithSeparator extends React.Component {
    props: {
        style: any;
        separatorStyle: any;
        children: any;
    };

    render() {
        const children = [];
        const length = React.Children.count(this.props.children);
        React.Children.forEach(
            this.props.children,
            (child, ii) => {
                children.push(child);
                if (ii !== length - 1) {
                    children.push(
                        <View
                        key={`separator-${ii}`}
                        style={[Styles.separator, this.props.separatorStyle]}
                        />
                    );
                }
            }
        );
        return (
            <View style={this.props.style}>
            {children}
            </View>
        );
    }
}

module.exports = ItemsWithSeparator;
