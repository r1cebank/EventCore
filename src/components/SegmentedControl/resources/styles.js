import { Utils } from '../../../global/globalIncludes';

const HEIGHT = 32;

const styles = Utils.F8StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        ios: {
            paddingBottom: 6,
            justifyContent: 'center',
            alignItems: 'center'
        },
        android: {
            paddingLeft: 60
        }
    },
    button: {
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        ios: {
            height: HEIGHT,
            paddingHorizontal: 20,
            borderRadius: HEIGHT / 2,
            borderWidth: 1
        },
        android: {
            paddingBottom: 6,
            paddingHorizontal: 10,
            borderBottomWidth: 3,
            marginRight: 10
        }
    },
    label: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white'
    },
    deselectedLabel: {
        color: 'rgba(255, 255, 255, 0.7)'
    }
});

export default styles;
