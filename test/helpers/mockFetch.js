// Mocking the interal fetch for react native
import Promise from 'bluebird';


function mockFetch(config) {
    return (url, params) => {
        return new Promise((resolve, reject) => {
            if(config.fetchFail) {
                reject(config.fetchError);
            }
            resolve({
                json() {
                    return new Promise((resolve) => { resolve(config.jsonContent); });
                }
            });
        });
    }
}

export default mockFetch;
