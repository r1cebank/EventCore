/* global it */
/* global describe */
/* eslint-disable no-unused-vars */

import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import Home from '../src/views/home';
import { expect } from 'chai';

describe('<Home />', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.contains(<Text>Hello World</Text>)).to.equal(true);
    });
});
