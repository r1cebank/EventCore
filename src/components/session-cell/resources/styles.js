import { StyleSheet } from 'react-native';

import { Colors } from '../../../global/global-includes';

const styles = StyleSheet.create({
    cell: {
        paddingVertical: 15,
        paddingLeft: 17,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    titleSection: {
        paddingRight: 9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleAndDuration: {
        justifyContent: 'center'
    },
    titleText: {
        flex: 1,
        fontSize: 17,
        lineHeight: 24,
        color: Colors.darkText,
        marginBottom: 4,
        marginRight: 10
    },
    duration: {
        fontSize: 12,
        color: Colors.lightText
    },
    locationText: {
        fontSize: 12
    },
    added: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0
    }
});

export default styles;
