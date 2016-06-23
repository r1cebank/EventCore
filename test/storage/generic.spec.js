/* global it */
/* global describe */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import MockStorage from '../helpers/mockStorage';
import MockFetch from '../helpers/mockFetch';

// File to test
import { Storage } from '../../src/global/globalIncludes';

const fetchConfig = {
    storageKey: 'navigation',
    fetched: 'dataFetched',
    update: 'updateData'
};

describe('Generic', () => {
    it('should fetch if content does not exist', (done) => {
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
        const fetchSpy = sinon.spy(fetch);
        Storage.Generic(storage, fetchSpy).fetch(fetchConfig).then((data) => {
            try {
                expect(fetchSpy).to.have.been.calledOnce;
                expect(get).to.have.been.calledWith(fetchConfig.storageKey);
                expect(data).to.eql({ success: true });
                done();
            } catch (e) {
                done(e);
            }
        });
    });
    it('if patch exists, should correctly patch data', (done) => {
        const storage = MockStorage({
            storage: {
                navigation: {
                    success: true
                }
            }
        });

        const fetch = MockFetch({
            jsonContent: [
                {
                    success: [
                        true,
                        0,
                        0
                    ],
                    data: [
                        true
                    ]
                }
            ]
        });

        // Get spies for mocked storage
        const get = sinon.spy(storage, 'get');
        const fetchSpy = sinon.spy(fetch);

        Storage.Generic(storage, fetchSpy).update(fetchConfig).then((data) => {
            try {
                expect(get).to.have.been.calledWith(fetchConfig.storageKey);
                expect(fetchSpy).to.have.been.calledOnce;
                expect(data.patched).to.eql({ data: true });
                done();
            } catch (e) {
                done(e);
            }
        });
    });
});
