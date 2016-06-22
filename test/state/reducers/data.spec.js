import chai, { expect } from 'chai';
// File to test
import { Actions } from '../../../src/global/globalIncludes';
import Reducer from '../../../src/state/reducers/data';
import shortId from 'shortid'

describe('Data', () => {
    it('Fetch data should not alter state', () => {
        const action = Actions.Data.fetchData({ config: true });
        const initialState = {
            id: shortId.generate()
        };
        const state = Reducer(initialState, action, true);
        expect(state).to.eql(initialState);
    });
    it('Update data should not alter state', () => {
        const action = Actions.Data.updateData({ config: true });
        const initialState = {
            id: shortId.generate()
        };
        const state = Reducer(initialState, action, true);
        expect(state).to.eql(initialState);
    });
    it('Data fetched should alter state', () => {
        const action = Actions.Data.dataFetched({ storageKey: 'navigation' }, { data: true });
        const initialState = {
            id: shortId.generate()
        };
        const state = Reducer(initialState, action, true);
        expect(state).to.have.property('loading', false);
        expect(state).to.have.deep.property('navigation.data', true);
    });
    it('Data fetched should not overwrite existing data', () => {
        const action = Actions.Data.dataFetched({ storageKey: 'navigation' }, { data: true });
        const initialState = {
            id: shortId.generate(),
            agenda: {
                data: true
            }
        };
        const state = Reducer(initialState, action, true);
        expect(state).to.have.property('loading', false);
        expect(state).to.have.deep.property('navigation.data', true);
        expect(state).to.have.deep.property('agenda.data', true);
    });
});
