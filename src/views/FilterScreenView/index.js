import React from 'react';
import { connect } from 'react-redux';
import { Animated, View, ScrollView } from 'react-native';

import { Components, Colors, Assets, Actions } from '../../global/globalIncludes';

import Styles from './resources/styles';

class FilterScreen extends React.Component {
    props: {
        isLoggedIn: boolean,
        filters: Array<string>;
        selectedFilters: {[id: string]: boolean};
        dispatch: (action: any) => void;
        navigator: any;
        onClose: ?() => void;
    };
    state: {
        selectedFilters: {[id: string]: boolean};
        anim: Animated.Value;
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: { ...this.props.selectedFilters },
            anim: new Animated.Value(0)
        };

        (this: any).applyFilter = this.applyFilter.bind(this);
        (this: any).clearFilter = this.clearFilter.bind(this);
        (this: any).close = this.close.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedFilters !== nextProps.selectedFilters) {
            this.setState({ selectedFilters: { ...nextProps.selectedFilters } });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.selectedFilters !== nextState.selectedFilters) {
            const toValue = (!!Object.keys(nextState.selectedFilters).length) ? 1 : 0;
            Animated.spring(this.state.anim, { toValue }).start();
        }
    }

    render() {
        const bottom = this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0]
        });
        const filters = this.props.filters.map((filter, index) => (
            <Components.FilterItem
                key={index}
                filter={filter.label}
                color={Colors.colorForfilter(this.props.filters.length, index)}
                isChecked={this.state.selectedFilters[filter.label]}
                onToggle={() => { this.toggleFilter(filter.label); }}
            />
        ));
        const selectedAnyfilters = this.props.filters.some(
            (filter) => this.state.selectedFilters[filter.label]
        );

        let leftItem;
        let rightItem;
        if (this.props.navigator) {
            leftItem = { title: 'Cancel', onPress: this.close };
        }
        if (selectedAnyfilters) {
            rightItem = {
                title: 'Clear',
                icon: Assets.XWhite,
                onPress: this.clearFilter
            };
        }
        return (
            <View style={Styles.container}>
                <Components.Header
                title="Filter"
                leftItem={leftItem}
                rightItem={rightItem}
                />
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Styles.scrollview}>
                    <Components.ItemsWithSeparator separatorStyle={Styles.separator}>
                        {filters}
                    </Components.ItemsWithSeparator>
                </ScrollView>
                <Animated.View style={[Styles.applyButton, { bottom }]}>
                    <Components.Button
                    caption="Apply filters"
                    onPress={this.applyFilter}
                    />
                </Animated.View>
            </View>
        );
    }

    toggleFilter(filter) {
        const selectedFilters = { ...this.state.selectedFilters };
        if (!selectedFilters[filter]) {
            selectedFilters[filter] = true;
        } else {
            delete selectedFilters[filter];
        }
        this.setState({ selectedFilters });
    }

    applyFilter() {
        this.props.dispatch(Actions.Filter.applyFilters(this.state.selectedFilters));
        this.close();
    }

    close() {
        const { navigator, onClose } = this.props;
        if (navigator) {
            requestAnimationFrame(() => navigator.pop());
        }
        if (onClose) {
            onClose();
        }
    }

    clearFilter() {
        this.setState({ selectedFilters: {} });
    }
}

function select(store) {
    return {
        filters: store.data.agenda.data.filters,
        selectedFilters: store.filters
    };
}

module.exports = connect(select)(FilterScreen);
