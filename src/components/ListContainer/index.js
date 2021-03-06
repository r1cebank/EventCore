/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React from 'react';
import ReactNative, {
    Animated,
    NativeModules,
    Dimensions,
    View,
    Platform
} from 'react-native';

import { Components, Assets } from '../../global/globalIncludes';
import Styles from './resources/styles';

const { Text } = Components.Text;

const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;

class ListContainer extends React.Component {

    static propTypes = {
        selectedSegment: React.PropTypes.number,
        leftItem: React.PropTypes.object,
        children: React.PropTypes.array,
        stickyHeader: React.PropTypes.element,
        selectedSectionColor: React.PropTypes.string,
        backgroundImage: React.PropTypes.number,
        backgroundColor: React.PropTypes.string,
        rightItem: React.PropTypes.object,
        extraItems: React.PropTypes.object,
        title: React.PropTypes.string,
        parallaxContent: React.PropTypes.element,
        onSegmentChange: React.PropTypes.func
    };
    constructor(props) {
        super(props);

        this.state = ({
            idx: this.props.selectedSegment || 0,
            anim: new Animated.Value(0),
            stickyHeaderHeight: 0
        });

        this.renderFakeHeader = this.renderFakeHeader.bind(this);
        this.handleStickyHeaderLayout = this.handleStickyHeaderLayout.bind(this);
        this.handleShowMenu = this.handleShowMenu.bind(this);
        this.handleSelectSegment = this.handleSelectSegment.bind(this);
        this._refs = [];
    }

    render() {
        let leftItem = this.props.leftItem;
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
                contentInset: { bottom: 49, top: 0 }, // TODO: auto calculate this
                automaticallyAdjustContentInsets: false,
                renderHeader: this.renderFakeHeader,
                scrollsToTop: idx === this.state.idx
            });
        });

        let { stickyHeader } = this.props;
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
                    maxHeight={
                        EMPTY_CELL_HEIGHT + this.state.stickyHeaderHeight + Components.Header.height
                    }
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
        let transform;
        if (!this.props.parallaxContent) {
            const distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
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
                if (ref.scrollTo) {
                    ref.scrollTo({ y, animated: false });
                }
            }
        });

    }

    renderFakeHeader() {
        if (Platform.OS === 'ios') {
            const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            return (
                <View style={{ height }} />
            );
        }
        return undefined;
    }

    renderFixedStickyHeader(stickyHeader) {
        return Platform.OS === 'ios'
        ? <View style={{ height: this.state.stickyHeaderHeight }} />
        : stickyHeader;
    }

    renderFloatingStickyHeader(stickyHeader) {
        const opacity = this.state.stickyHeaderHeight === 0 ? 0 : 1;
        let transform;
        if (!stickyHeader || Platform.OS !== 'ios') {
            return null;
        }

        // If native pinning is not available, fallback to Animated
        if (!NativeModules.F8Scrolling) {
            const distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
            const translateY = 0;
            this.state.anim.interpolate({
                inputRange: [0, distance],
                outputRange: [distance, 0],
                extrapolateRight: 'clamp'
            });
            transform = [{ translateY }];
        }

        return (
            <Animated.View
                ref={(ref) => this._pinned = ref}
                onLayout={this.handleStickyHeaderLayout}
                style={[Styles.stickyHeader, { opacity }, { transform }]}>
                {stickyHeader}
            </Animated.View>
        );
    }

    handleStickyHeaderLayout({ nativeEvent: { layout } }) {
        this.setState({ stickyHeaderHeight: layout.height });
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.selectedSegment === 'number' &&
        nextProps.selectedSegment !== this.state.idx) {
            this.setState({ idx: nextProps.selectedSegment });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const distance = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
        if (!NativeModules.F8Scrolling) {
            return;
        }

        if (this.state.idx !== prevState.idx ||
            this.state.stickyHeaderHeight !== prevState.stickyHeaderHeight) {
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
            const { onSegmentChange } = this.props;
            this.setState({ idx }, () => onSegmentChange && onSegmentChange(idx));
        }
    }

    handleShowMenu() {
        this.context.openDrawer();
    }
}

ListContainer.defaultProps = {
    selectedSectionColor: 'white'
};

ListContainer.contextTypes = {
    openDrawer: React.PropTypes.func,
    hasUnreadNotifications: React.PropTypes.number
};

module.exports = ListContainer;
