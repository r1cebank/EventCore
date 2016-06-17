import { StyleSheet } from 'react-native';
import { Colors } from '../../../global/globalIncludes';

const HEIGHT = 50;

const styles = StyleSheet.create({
    container: {
        height: HEIGHT
        // borderRadius: HEIGHT / 2,
        // borderWidth: 1 / PixelRatio.get(),
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40
    },
    border: {
        borderWidth: 1,
        borderColor: Colors.lightText,
        borderRadius: HEIGHT / 2
    },
    primaryButton: {
        borderRadius: HEIGHT / 2,
        backgroundColor: 'transparent'
    },
    icon: {
        marginRight: 12
    },
    caption: {
        letterSpacing: 1,
        fontSize: 12
    },
    primaryCaption: {
        color: 'white'
    },
    secondaryCaption: {
        color: Colors.lightText
    }
});

export default styles;
