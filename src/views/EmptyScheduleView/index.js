import React from 'react';
import { View, Image } from 'react-native';

import { Components } from '../../global/globalIncludes';

import Styles from './resources/styles';

class EmptySchedule extends React.Component {
    props: {
        style: any;
        title: string;
        image: number;
        text: string;
        children: any;
    };

    render() {
        const { Paragraph, Heading1 } = Components.Text;
        const image = this.props.image &&
        <Image style={Styles.image} source={this.props.image} />;
        const title = this.props.title &&
        <Heading1 style={Styles.title}>{this.props.title}</Heading1>;

        return (
            <View style={[Styles.container, this.props.style]}>
            {image}
            {title}
            <Paragraph style={Styles.text}>
            {this.props.text}
            </Paragraph>
            {this.props.children}
            </View>
        );
    }
}

module.exports = EmptySchedule;
