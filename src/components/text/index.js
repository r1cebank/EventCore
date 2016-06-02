import React from 'react';
import Styles from './resources/styles';


export function Text({ style, ...props }) {
    return <React.Text style={[Styles.font, style]} {...props} />;
}

export function Heading1({ style, ...props }) {
    return <React.Text style={[Styles.font, Styles.h1, style]} {...props} />;
}

export function Paragraph({ style, ...props }) {
    return <React.Text style={[Styles.font, Styles.p, style]} {...props} />;
}
