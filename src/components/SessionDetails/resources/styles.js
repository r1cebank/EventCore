import { StyleSheet, PixelRatio } from 'react-native';
import { Colors } from '../../../global/globalIncludes';

const PADDING = 15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        padding: 26,
        paddingBottom: 60
    },
    miniHeader: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: 12,
        top: 0,
        right: 12,
        paddingVertical: 9,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#E1E1E1'
    },
    miniTitle: {
        fontSize: 12,
        flex: 1,
        color: Colors.darkText
    },
    location: {
        fontSize: 12
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -1,
        lineHeight: 32,
        marginVertical: 20
    },
    time: {
        color: Colors.lightText,
        marginBottom: 20
    },
    description: {
        fontSize: 17,
        lineHeight: 25
    },
    topics: {
        fontSize: 12,
        color: Colors.lightText
    },
    line: {
        height: 1 / PixelRatio.get(),
        backgroundColor: Colors.lightText,
        flex: 1
    },
    actions: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 1,
        margin: 10,
        paddingVertical: 10,
        borderTopColor: '#eeeeee',
        backgroundColor: 'white'
    },
    shareButton: {
        backgroundColor: 'transparent',
        padding: PADDING,
        position: 'absolute',
        right: 0,
        top: 0
    }
});

export default styles;
