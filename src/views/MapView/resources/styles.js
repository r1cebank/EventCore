import { StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 400
    },
    map: {
        flex: 1,
        resizeMode: Image.resizeMode.contain
    }
});

export default styles;
