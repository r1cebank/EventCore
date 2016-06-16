import { StyleSheet } from 'react-native';

const HEIGHT = 50;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: HEIGHT,
        overflow: 'hidden'
    },
    button: {
        flex: 1,
        borderRadius: HEIGHT / 2,
        backgroundColor: 'transparent',
        paddingHorizontal: 40
    },
    content: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginRight: 12
    },
    caption: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white'
    }
});

export default styles;
