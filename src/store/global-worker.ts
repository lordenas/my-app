
// Core
import { ActionCreator, AnyAction } from 'redux';
import { SagaIterator } from '@redux-saga/core';
import { put, call, delay } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

// Common types
import { FillActionType, ErrorActionType } from '../types/redux-types';



export type OptionsType<T, D = void> = {
    fetcher: (uri?: any) => Promise<AxiosResponse<T>>;
    fetcherParam?: D;
    startFetching: ActionCreator<AnyAction>;
    stopFetching: ActionCreator<AnyAction>;
    fill: FillActionType<T>;
    setErrorAction: ErrorActionType;
    delay?: number
};


export function* makeRequestWithSpinner<T, D = void>(options: OptionsType<T, D>): SagaIterator {
    const {
        fetcher, fetcherParam, startFetching, stopFetching, fill, setErrorAction,
    } = options;

    try {
        console.log('test pratams___', fetcherParam)
        yield put(startFetching());

        const result: AxiosResponse<T> = yield call(fetcher, fetcherParam);
        console.log('____RESULT-FETCH____', result)

        yield put(fill(result.data));

        if(options.delay) yield delay(options.delay)

    } catch (error: any) {
        if(error.response) {
            yield put(setErrorAction(error.response));
        } else {
            yield put(setErrorAction(error.message));
        }
    } finally {
        yield put(stopFetching());
    }
}