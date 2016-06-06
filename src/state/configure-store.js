/* @flow */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import devTools from 'remote-redux-devtools';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import dataReducer from './reducers/data';
import navigationStateReducer from './reducers/navigation';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const rootReducer = combineReducers({
    // every modules reducer should be define here
    data: dataReducer,
    navigationstate: navigationStateReducer
});

const configureStore = function (initialState: Object = {}): Function {
    return createStoreWithMiddleware(rootReducer, initialState, devTools());
};

export default configureStore;
