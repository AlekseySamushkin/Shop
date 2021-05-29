import {applyMiddleware, compose, createStore,} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';
import sagas from './sagas';
import {createHashHistory} from 'history';


export const history = createHashHistory({
    hashType: 'slash',
    getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [
    sagaMiddleware,
    routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

export const store = createStore(
    createRootReducer(history),
    composedEnhancers
);


sagaMiddleware.run(sagas);
