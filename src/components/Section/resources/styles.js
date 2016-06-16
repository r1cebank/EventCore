import { StyleSheet } from 'react-native';
import { Colors } from '../../../global/globalIncludes';

const styles = StyleSheet.create({
    section: {
        marginTop: 30
    },
    sectionHeader: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    sectionTitle: {
        color: Colors.lightText,
        marginRight: 14,
        fontSize: 12
    }
});

export default styles;
