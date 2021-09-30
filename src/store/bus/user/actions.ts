import { createAction } from "@reduxjs/toolkit";
import { createActionTypes, createApiActions } from "../../rootActions";
import { User, UserRequestType } from "./types";

export const getUsers = createApiActions<UserRequestType, User[]>(
    createActionTypes("USER")
);

export const currentPage = createAction<number>('SET_PAGE_USER');

export const addPositiveRating = createAction<number>('SET_ADD_POSITIVE');
export const addNegativeRating = createAction<number>('SET_ADD_NEGATIVE');

export const upRating = createAction<number>('UP_RATING');
export const downRating = createAction<number>('DOWN_RATING');

