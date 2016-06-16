import { StyleSheet } from 'react-native';

const CIRCLE_SIZE = 4;

const styles = StyleSheet.create({
    circle: {
        margin: 2,
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2
    },
    full: {
        backgroundColor: '#fff'
    },
    empty: {
        backgroundColor: '#fff5'
    }
});

export default styles;
