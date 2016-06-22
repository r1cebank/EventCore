/* global it */
/* global describe */
import chai from 'chai';
import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import MockStore from '../helpers/mockStore';
import MockStorage from '../helpers/mockStorage';
import MockFetch from '../helpers/mockFetch';

// File to test
import { Storage } from '../../src/global/globalIncludes';

let fetchConfig = {
    storageKey: 'navigation',
    fetched: 'dataFetched',
    update: 'updateData'
};

describe('Generic', () => {
    it('should fetch if content does not exist', (done) => {
        const getState = {}; // initial state of the store

        const store = { appStore: MockStore(getState) };

        const storage = MockStorage({
            storage: {
            }
        });

        const fetch = MockFetch({
            jsonContent: {
                success: true
            }
        });

        // Get spies for mocked storage
        const get = sinon.spy(storage, 'get');
        const save = sinon.spy(storage, 'save');

        store.appStore.subscribe(() => {
            const actions = store.appStore.getActions();
            expect('a').to.equal('a');
            done();
        });

        Storage.Generic(store, storage, fetch, done).fetch(fetchConfig);
    });
});
