import React from 'react';
import { Text as ReactText } from 'react-native';

import Styles from './resources/styles';


export function Text({ style, ...props }) {
    return <ReactText style={[Styles.font, style]} {...props} />;
}

export function Heading1({ style, ...props }) {
    return <ReactText style={[Styles.font, Styles.h1, style]} {...props} />;
}

export function Paragraph({ style, ...props }) {
    return <ReactText style={[Styles.font, Styles.p, style]} {...props} />;
}
