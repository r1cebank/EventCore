import { StyleSheet } from 'react-native';

const SIZE = 24;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkbox: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        marginRight: 10
    },
    title: {
        fontSize: 17,
        color: 'white',
        flex: 1
    }
});

export default styles;
