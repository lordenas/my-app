import {createAction} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const createActionTypes = (action: string) => ({
	ASYNC: `ASYNC_${action.toUpperCase()}`,
	START: `START_${action.toUpperCase()}`,
	STOP: `STOP_${action.toUpperCase()}`,
	FILL: `FILL_${action.toUpperCase()}`,
	ERROR: `ERROR_${action.toUpperCase()}`,
});

/**
 *
 * @typeParam `R` the request payload type
 * @typeParam `S` the success payload type
 * @typeParam `F` the failure payload type
 */

export const createApiActions = <R = any, S = any, F = AxiosError>(
	actionTypes: ReturnType<typeof createActionTypes>,
) => ({
	async: createAction<R>(actionTypes.ASYNC),
	start: createAction(actionTypes.START),
	stop: createAction(actionTypes.STOP),
	fill: createAction<S>(actionTypes.FILL),
	error: createAction<F>(actionTypes.ERROR),
});

export type createActionTypes = typeof createActionTypes;
export type createApiActionsTypes = typeof createApiActions;
export type ActionTypeReducer<R, S> = ThisParameterType<typeof createApiActions>


export type T3 = ReturnType<<T extends U, U extends ActionTypeReducer<any, any>>() => T>;