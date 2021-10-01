import { createAction } from "@reduxjs/toolkit";
import { createActionTypes, createApiActions } from "../../rootActions";
import { TypeRating, User, UserRequestType } from "./types";

export const getUsers = createApiActions<UserRequestType, User[]>(
    createActionTypes("USER")
);

export const currentPage = createAction<number>('SET_PAGE_USER');

//экшены для левого списка
export const addPositiveRating = createAction<{userId: number}>('SET_ADD_POSITIVE');
export const addNegativeRating = createAction<{userId: number}>('SET_ADD_NEGATIVE');

//экшены для вкладок
export const upRating = createAction<{userId: number, type: TypeRating}>('UP_RATING');
export const downgrade = createAction<{userId: number, type: TypeRating}>('DOWN_RATING');

export const banUser = createAction<{userId: number}>('BAN_USER');
export const rewardUser = createAction<{userId: number}>('REWARD_USER');
export const deleteUser = createAction<{userId: number, type: TypeRating}>('DELETE_USER');

export const cleareUser = createAction('CLEARE_USER');