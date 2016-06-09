import React from 'react';

import { Views, Components, Colors, Icons, Defaults, Utils, Assets } from '../../global/globalIncludes';
import Styles from './resources/styles';

class Carousel extends React.Component {
    render() {
        let cards = [];
        const {count, selectedIndex, renderCard} = this.props;

        for (let i = 0; i < count; i++) {
            let content = null;
            if (Math.abs(i - selectedIndex) < 2) {
                content = renderCard(i);
            }
            cards.push(content);
        }
        return (
            <Components.ViewPager style={Styles.carousel} {...this.props} bounces={true}>
                {cards}
            </Components.ViewPager>
        );
    }
}

module.exports = Carousel;
