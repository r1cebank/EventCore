import chai, { expect } from 'chai';
import MockStore from '../../helpers/mockStore';
// File to test
import { Actions } from '../../../src/global/globalIncludes';

describe('Data', () => {
    it('Fetch data should return a function', () => {
        const action = Actions.Data.fetchData({ config: true });
        expect(action).to.be.a('function');

    });
    it('Update data should return a function', () => {
        const action = Actions.Data.updateData({ config: true });
        expect(action).to.be.a('function');

    });
    it('Loading complete should return correct action', () => {
        const getState = {}; // initial state of the store

        const store = MockStore(getState);

        const action = Actions.Data.loadingComplete();

        store.dispatch(action);
        const actions = store.getActions();
        expect(actions).to.eql([{ type: 'LOADING_COMPLETE' }]);
    });
});
