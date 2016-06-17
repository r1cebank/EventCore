import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Assets } from '../../global/globalIncludes';

import Styles from './resources/styles';

class FilterHeader extends React.Component {
    static propTypes = {
        selectedFilters: React.PropTypes.object,
        onClearFilter: React.PropTypes.func
    };
    render() {
        const filters = Object.keys(this.props.selectedFilters);
        if (filters.length === 0) {
            return null;
        }

        return (
            <View style={Styles.container}>
                <Text style={Styles.text} numberOfLines={1}>
                    {'Filters: '}
                    <Text style={Styles.filters}>
                        {filters.join(', ')}
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

module.exports = FilterHeader;
