import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../../../global/global-includes';

const scale = Dimensions.get('window').width / 375;


function normalize(size) {
    return Math.round(scale * size);
}

const styles = StyleSheet.create({
    font: {
        fontFamily: undefined
    },
    h1: {
        fontSize: normalize(24),
        lineHeight: normalize(27),
        color: Colors.darkText,
        fontWeight: 'bold',
        letterSpacing: -1
    },
    p: {
        fontSize: normalize(15),
        lineHeight: normalize(23),
        color: Colors.lightText
    }
});

export default styles;
