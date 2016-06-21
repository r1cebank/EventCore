/* global it */
/* global describe */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

import { Storage } from '../../src/global/globalIncludes';

describe('Generic', () => {
    it('should dispatch action', () => {
        const getState = {}; // initial state of the store

        const store = mockStore(getState);
        const fakeStorage = {
            get() {

            },
            save() {

            }
        };
        Storage.Generic(store, fakeStorage).fetch({});
        store.dispatch(addTodo);

        const actions = store.getActions();

        expect(actions).to.eql([addTodo]);
    });
});
