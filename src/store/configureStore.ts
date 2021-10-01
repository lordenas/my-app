import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';

import {composeWithDevTools} from "redux-devtools-extension";
import { save, load } from "redux-localstorage-simple"
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, load(), composeWithDevTools(applyMiddleware(sagaMiddleware, save())));

sagaMiddleware.run(rootSaga).toPromise()

export type RootStore = ReturnType<typeof rootReducer>

