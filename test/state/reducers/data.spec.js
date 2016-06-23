import chai, { expect } from 'chai';
// File to test
import { Actions } from '../../../src/global/globalIncludes';
import Reducer from '../../../src/state/reducers/data';
import shortId from 'shortid'

describe('Data', () => {
    it('Data fetched should alter state', () => {
        const action = { type: 'DATA_FETCHED', config: { storageKey: 'navigation' } , data: { data: true } };
        const initialState = {
            id: shortId.generate()
        };
        const state = Reducer(initialState, action, true);
        expect(state).to.have.deep.property('navigation.data', true);
    });
    it('Loading complete should alter loading flag', () => {
        const action = Actions.Data.loadingComplete();
        const initialState = {
            id: shortId.generate()
        };
        const state = Reducer(initialState, action, true);
        expect(state).to.have.property('loading', false);
    });
    it('Data fetched should not overwrite existing data', () => {
        const action = { type: 'DATA_FETCHED', config: { storageKey: 'navigation' }, data: { data: true } };
        const initialState = {
            id: shortId.generate(),
            agenda: {
                data: true
            }
        };
        const state = Reducer(initialState, action, true);
        expect(state).to.have.deep.property('navigation.data', true);
        expect(state).to.have.deep.property('agenda.data', true);
    });
});
