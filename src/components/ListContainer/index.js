
import ReactNative, { Animated, NativeModules, Dimensions, View, Platform, ActivityIndicatorIOS, ProgressBarAndroid } from 'react-native';
import { Views, Components, Colors, Icons, Defaults, Utils, Assets } from '../../global/globalIncludes';

const { Text } = Components.Text;

// var ParallaxBackground = require('ParallaxBackground');

import React from 'react';

import Styles from './resources/styles';

const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;

const ActivityIndicator = Platform.OS === 'ios'
? ActivityIndicatorIOS
: ProgressBarAndroid;

// var Relay = require('react-relay');
// var RelayRenderer = require('react-relay/lib/RelayRenderer.js');

// class MainRoute extends Relay.Route {}
// MainRoute.queries = { viewer: () => Relay.QL`query { viewer }` };
// MainRoute.routeName = 'MainRoute';

// class RelayLoading extends React.Component {
//     render() {
//         const child = React.Children.only(this.props.children);
//         if (!child.type.getFragmentNames) {
//             return child;
//         }
//         return (
//             <RelayRenderer
//             Container={child.type}
//             queryConfig={new MainRoute()}
//             environment={Relay.Store}
//             render={({props}) => this.renderChild(child, props)}
//             />
//         );
//     }
//
//     renderChild(child, props) {
//         if (!props) {
//             return (
//                 <View style={{height: 400}}>
//                 {child.props.renderHeader && child.props.renderHeader()}
//                 <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
//                 <ActivityIndicator />
//                 </View>
//                 </View>
//             );
//         }
//         return React.cloneElement(child, {...this.props, ...props});
//     }
// }

class ListContainer extends React.Component {
    props: Props;
    _refs: Array<any>;
    _pinned: any;

    constructor(props: Props) {
        super(props);

        this.state = ({
            idx: this.props.selectedSegment || 0,
            anim: new Animated.Value(0),
            stickyHeaderHeight: 0,
        }: State);

        this.renderFakeHeader = this.renderFakeHeader.bind(this);
        this.handleStickyHeaderLayout = this.handleStickyHeaderLayout.bind(this);
        this.handleShowMenu = this.handleShowMenu.bind(this);
        this.handleSelectSegment = this.handleSelectSegment.bind(this);
        this._refs = [];
    }

    render() {
        var leftItem = this.props.leftItem;
        if (!leftItem && Platform.OS === 'android') {
            leftItem = {
                title: 'Menu',
                icon: this.context.hasUnreadNotifications
                ? Assets.HamburgerUnread
                : Assets.Hanburger,
                onPress: this.handleShowMenu
            };
        }

        const segments = [];
        const content = React.Children.map(this.props.children, (child, idx) => {
            segments.push(child.props.title);
            return React.cloneElement(child, {
                ref: (ref) => this._refs[idx] = ref,
                onScroll: (e) => this.handleScroll(idx, e),
                style: Styles.listView,
                showsVerticalScrollIndicator: false,
                scrollEventThrottle: 16,
                contentInset: {bottom: 69, top: 0}, // Why inset of 69 will fix bounce issue??
                automaticallyAdjustContentInsets: false,
                renderHeader: this.renderFakeHeader,
                scrollsToTop: idx === this.state.idx
            });
        });

        let {stickyHeader} = this.props;
        if (segments.length > 1) {
            stickyHeader = (
                <View>
                    <Components.SegmentedControl
                        values={segments}
                        selectedIndex={this.state.idx}
                        selectionColor={this.props.selectedSectionColor}
                        onChange={this.handleSelectSegment}
                    />
                    {stickyHeader}
                </View>
            );
        }
        // TODO: Bind to ViewPager animation
        const backgroundShift = segments.length === 1
        ? 0
        : this.state.idx / (segments.length - 1);

        return (
            <View style={Styles.container}>
                <View style={Styles.headerWrapper}>
                    <Components.ParallaxBackground
                    minHeight={this.state.stickyHeaderHeight + Components.Header.height}
                    maxHeight={EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + Components.Header.height}
                    offset={this.state.anim}
                    backgroundImage={this.props.backgroundImage}
                    backgroundShift={backgroundShift}
                    backgroundColor={this.props.backgroundColor}>
                        {this.renderParallaxContent()}
                    </Components.ParallaxBackground>
                    <Components.Header
                        title={this.props.title}
                        leftItem={leftItem}
                        rightItem={this.props.rightItem}
                        extraItems={this.props.extraItems}>
                        {this.renderHeaderTitle()}
                     </Components.Header>
                     {this.renderFixedStickyHeader(stickyHeader)}
                </View>
                <Components.ViewPager
                    count={segments.length}
                    selectedIndex={this.state.idx}
                    onSelectedIndexChange={this.handleSelectSegment}>
                    {content}
                </Components.ViewPager>
                {this.renderFloatingStickyHeader(stickyHeader)}
            </View>
        );
    }

    renderParallaxContent() {
        if (Platform.OS === 'android') {
            return <View />;
        }
        if (this.props.parallaxContent) {
            return this.props.parallaxContent;
        }
        return (
            <Text style={Styles.parallaxText}>
                {this.props.title}
            </Text>
        );
    }

    renderHeaderTitle() {
        if (Platform.OS === 'android') {
            return null;
        }
        var transform;
        if (!this.props.parallaxContent) {
            var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            transform = {
                opacity: this.state.anim.interpolate({
                    inputRange: [distance - 20, distance],
                    outputRange: [0, 1],
                    extrapolate: 'clamp'
                })
            };
        }
        return (
            <Animated.Text style={[Styles.headerTitle, transform]}>
                {this.props.title}
            </Animated.Text>
        );
    }

    handleScroll(idx, e) {
        if (idx !== this.state.idx) {
            return;
        }
        let y = 0;
        if (Platform.OS === 'ios') {
            this.state.anim.setValue(e.nativeEvent.contentOffset.y);
            const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            y = Math.min(e.nativeEvent.contentOffset.y, height);
        }
        this._refs.forEach((ref, ii) => {
            if (ii !== idx && ref) {
                ref.scrollTo && ref.scrollTo({y, animated: false});
            }
        });

    }

    renderFakeHeader() {
        if (Platform.OS === 'ios') {
            const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            return (
                <View style={{height}} />
            );
        }
    }

    renderFixedStickyHeader(stickyHeader: ?ReactElement) {
        return Platform.OS === 'ios'
        ? <View style={{height: this.state.stickyHeaderHeight}} />
        : stickyHeader;
    }

    renderFloatingStickyHeader(stickyHeader: ?ReactElement) {
        if (!stickyHeader || Platform.OS !== 'ios') {
            return;
        }
        var opacity = this.state.stickyHeaderHeight === 0 ? 0 : 1;
        var transform;

        // If native pinning is not available, fallback to Animated
        if (!NativeModules.F8Scrolling) {
            var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            var translateY = 0; this.state.anim.interpolate({
                inputRange: [0, distance],
                outputRange: [distance, 0],
                extrapolateRight: 'clamp',
            });
            transform = [{translateY}];
        }

        return (
            <Animated.View
                ref={(ref) => this._pinned = ref}
                onLayout={this.handleStickyHeaderLayout}
                style={[Styles.stickyHeader, {opacity}, {transform}]}>
                {stickyHeader}
            </Animated.View>
        );
    }

    handleStickyHeaderLayout({nativeEvent: { layout, target }}: any) {
        this.setState({stickyHeaderHeight: layout.height});
    }

    componentWillReceiveProps(nextProps: Props) {
        if (typeof nextProps.selectedSegment === 'number' &&
        nextProps.selectedSegment !== this.state.idx) {
            this.setState({idx: nextProps.selectedSegment});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!NativeModules.F8Scrolling) {
            return;
        }

        if (this.state.idx !== prevState.idx ||
            this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
                var distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;

                if (this._refs[prevState.idx] && this._refs[prevState.idx].getScrollResponder) {
                    const oldScrollViewTag = ReactNative.findNodeHandle(
                        this._refs[prevState.idx].getScrollResponder()
                    );
                    NativeModules.F8Scrolling.unpin(oldScrollViewTag);
                }

                if (this._refs[this.state.idx] && this._refs[this.state.idx].getScrollResponder) {
                    const newScrollViewTag = ReactNative.findNodeHandle(
                        this._refs[this.state.idx].getScrollResponder()
                    );
                    const pinnedViewTag = ReactNative.findNodeHandle(this._pinned);
                    NativeModules.F8Scrolling.pin(newScrollViewTag, pinnedViewTag, distance);
                }
            }
        }

        handleSelectSegment(idx: number) {
            if (this.state.idx !== idx) {
                const {onSegmentChange} = this.props;
                this.setState({idx}, () => onSegmentChange && onSegmentChange(idx));
            }
        }

        handleShowMenu() {
            this.context.openDrawer();
        }
    }

    ListContainer.defaultProps = {
        selectedSectionColor: 'white',
    };

    ListContainer.contextTypes = {
        openDrawer: React.PropTypes.func,
        hasUnreadNotifications: React.PropTypes.number,
    };

    module.exports = ListContainer;
