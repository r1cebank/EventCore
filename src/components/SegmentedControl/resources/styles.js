import { Utils } from '../../../global/globalIncludes';

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
    }
});

export default styles;
