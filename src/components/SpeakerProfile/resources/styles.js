import { StyleSheet } from 'react-native';
import { Colors } from '../../../global/globalIncludes';

const SIZE = 76;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingBottom: 14,
        alignItems: 'center'
    },
    picture: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2
    },
    info: {
        paddingLeft: 20,
        flex: 1
    },
    name: {
        fontSize: 15,
        marginBottom: 2,
        color: Colors.darkText,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 12,
        lineHeight: 16,
        color: Colors.darkText
    }
});

export default styles;
