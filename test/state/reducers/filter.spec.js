import chai, { expect } from 'chai';
// File to test
import { Actions } from '../../../src/global/globalIncludes';
import Reducer from '../../../src/state/reducers/filter';

describe('Filter', () => {
    it('Apply filter should alter state correctly', () => {
        const action = Actions.Filter.applyFilters({ filter1: true });
        const state = Reducer({}, action);
        expect(state).to.have.property('filter1', true);
    });
    it('Clear filter should alter state correctly', () => {
        const action = Actions.Filter.clearFilters();
        const state = Reducer({ filter1: true }, action);
        expect(state).not.to.have.property('filter1');
    });
});
