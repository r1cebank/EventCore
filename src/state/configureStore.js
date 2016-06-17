/* @flow */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import devTools from 'remote-redux-devtools';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import dataReducer from './reducers/data';
import navigationReducer from './reducers/navigation';
import filterReducer from './reducers/filter';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

const rootReducer = combineReducers({
    // every modules reducer should be define here
    data: dataReducer,
    navigation: navigationReducer,
    filters: filterReducer
});

const configureStore = function (initialState) {
    const enhancer = compose(autoRehydrate(), devTools());
    const store = createStoreWithMiddleware(rootReducer, initialState, enhancer);
    persistStore(store, { storage: AsyncStorage, blacklist: ['data'] });
    return store;
};

export default configureStore;
