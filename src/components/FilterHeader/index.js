import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Assets } from '../../global/globalIncludes';

import Styles from './resources/styles';

// TODO: Pull redux connection up
// const {connect} = require('react-redux');
// const {clearFilter} = require('../../actions');

class FilterHeader extends React.Component {
    static propTypes = {
        filter: React.PropTypes.array,
        onClearFilter: React.PropTypes.func
    };
    render() {
        const topics = Object.keys(this.props.filter);
        if (topics.length === 0) {
            return null;
        }

        return (
            <View style={Styles.container}>
                <Text style={Styles.text} numberOfLines={1}>
                    {'Filters: '}
                    <Text style={Styles.filters}>
                        {topics.join(', ')}
                    </Text>
                </Text>
                <TouchableOpacity
                    accessibilityLabel="Clear filter"
                    accessibilityTraits="button"
                    style={Styles.clear}
                onPress={this.props.onClearFilter}>
                <Image source={Assets.XWhite} />
                </TouchableOpacity>
            </View>
        );
    }
}

// function select(store) {
//     return {
//         filter: store.filter
//     };
// }
//
// function actions(dispatch) {
//     return {
//         onClearFilter: () => dispatch(clearFilter())
//     };
// }

module.exports = FilterHeader;
// module.exports = connect(select, actions)(FilterHeader);
