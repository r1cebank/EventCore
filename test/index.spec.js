/* global it */
/* global describe */
/* eslint-disable no-unused-vars */

import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import Home from '../src/components/home';
import { expect } from 'chai';

describe('<Home />', () => {
    it('should render stuff', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.length).to.equal(1);
    });
});
