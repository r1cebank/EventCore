import { StyleSheet, Dimensions } from 'react-native';

const HEIGHT = Dimensions.get('window').height > 600
? 200
: 150;
const HEADER_HEIGHT = HEIGHT + 156;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        overflow: 'hidden'
    },
    contentContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        height: HEADER_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});

export default styles;
