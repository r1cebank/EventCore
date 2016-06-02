import React from 'react';

import { View, ScrollView, ViewPagerAndroid, Platform } from 'react-native';

import Styles from './resources/styles';


class ViewPager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            selectedIndex: this.props.selectedIndex,
            initialSelectedIndex: this.props.selectedIndex,
            scrollingTo: null
        };
        (this: any).handleHorizontalScroll = this.handleHorizontalScroll.bind(this);
        (this: any).adjustCardSize = this.adjustCardSize.bind(this);
    }

    render() {
        if (Platform.OS === 'ios') {
            return this.renderIOS();
        } else {
            return this.renderAndroid();
        }
    }

    renderIOS() {
        return (
            <ScrollView
                ref="scrollview"
                contentOffset={{
                    x: this.state.width * this.state.initialSelectedIndex,
                    y: 0,
                }}
                style={[Styles.scrollview, this.props.style]}
                horizontal={true}
                pagingEnabled={true}
                bounces={!!this.props.bounces}
                scrollsToTop={false}
                onScroll={this.handleHorizontalScroll}
                scrollEventThrottle={100}
                removeClippedSubviews={true}
                automaticallyAdjustContentInsets={false}
                directionalLockEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onLayout={this.adjustCardSize}>
                {this.renderContent()}
            </ScrollView>
        );
    }

    renderAndroid() {
        return (
            <ViewPagerAndroid
                ref="scrollview"
                initialPage={this.state.initialSelectedIndex}
                onPageSelected={this.handleHorizontalScroll}
                style={Styles.container}>
                {this.renderContent()}
            </ViewPagerAndroid>
        );
    }

    adjustCardSize(e: any) {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            if (Platform.OS === 'ios') {
                this.refs.scrollview.scrollTo({
                    x: nextProps.selectedIndex * this.state.width,
                    animated: true,
                });
                this.setState({scrollingTo: nextProps.selectedIndex});
            } else {
                this.refs.scrollview.setPage(nextProps.selectedIndex);
                this.setState({selectedIndex: nextProps.selectedIndex});
            }
        }
    }

    renderContent(): Array<ReactElement> {
        var {width, height} = this.state;
        var style = Platform.OS === 'ios' && Styles.card;
        return React.Children.map(this.props.children, (child, i) => (
            <View style={[style, {width, height}]} key={'r_' + i}>
            {child}
            </View>
        ));
    }

    handleHorizontalScroll(e: any) {
        var selectedIndex = e.nativeEvent.position;
        if (selectedIndex === undefined) {
            selectedIndex = Math.round(
                e.nativeEvent.contentOffset.x / this.state.width,
            );
        }
        if (selectedIndex < 0 || selectedIndex >= this.props.count) {
            return;
        }
        if (this.state.scrollingTo !== null && this.state.scrollingTo !== selectedIndex) {
            return;
        }
        if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
            this.setState({selectedIndex, scrollingTo: null});
            const {onSelectedIndexChange} = this.props;
            onSelectedIndexChange && onSelectedIndexChange(selectedIndex);
        }
    }
}

module.exports = ViewPager;
