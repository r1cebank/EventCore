import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#12336B',
        paddingLeft: 16
    },
    text: {
        flex: 1,
        fontSize: 12,
        color: 'white'
    },
    clear: {
        paddingHorizontal: 16,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    filters: {
        color: 'rgba(255, 255, 255, 0.65)'
    }
});

export default styles;
