import React from 'react';

import { Components } from '../../global/globalIncludes';
import Styles from './resources/styles';

class Carousel extends React.Component {
    static propTypes = {
        count: React.PropTypes.number,
        selectedIndex: React.PropTypes.number,
        renderCard: React.PropTypes.func
    };

    render() {
        let cards = [];
        const { count, selectedIndex, renderCard } = this.props;

        for (let i = 0; i < count; i++) {
            let content = null;
            if (Math.abs(i - selectedIndex) < 2) {
                content = renderCard(i);
            }
            cards.push(content);
        }
        return (
            <Components.ViewPager style={Styles.carousel} {...this.props} >
                {cards}
            </Components.ViewPager>
        );
    }
}

module.exports = Carousel;
