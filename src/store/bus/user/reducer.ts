import { createReducer } from "@reduxjs/toolkit";
import { addNegativeRating, addPositiveRating, currentPage, downRating, getUsers, upRating } from "./actions";
import { InitialStateUsers } from "./types";

export const initialState: InitialStateUsers = {
    currentPage: 1,
    userList: {
        data: [],
        loading: false,
        error: null
    },
    positiveUsersList: [],
    negativeUsersList: []
}

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(getUsers.start, (state) => ({
        ...state,
        userList: {
            ...state.userList,
            loading: true
        },
    }));
    builder.addCase(getUsers.stop, (state) => ({
        ...state,
        userList: {
            ...state.userList,
            loading: false
        },
    }));
    builder.addCase(getUsers.fill, (state, { payload }) => {
        const modified = payload.map((i) => ({...i, rating: 0}))
        return {
            ...state,
            userList: {
                ...state.userList,
                data: state.currentPage > 1 ? [...state.userList.data, ...modified] : modified,
            },
        }
    });
    builder.addCase(getUsers.error, (state, { payload }) => ({
        ...state,
        userList: {
            ...state.userList,
            error: payload
        },
    }));


    builder.addCase(currentPage, (state, { payload }) => ({
        ...state,
        currentPage: payload
    }));

    builder.addCase(addPositiveRating, (state, { payload }) => {
        const tempUserList = state.userList.data.filter(i => i.id !== payload);
        const positiveUserTemp = state.userList.data.filter(i => i.id === payload).map(i => ({...i, rating: i.rating + 1}))
        return {
            ...state,
            userList: {
                ...state.userList,
                data: tempUserList,
            },
            positiveUsersList: [...state.positiveUsersList, ...positiveUserTemp]
        }
    });

    builder.addCase(addNegativeRating, (state, { payload }) => {
        const tempUserList = state.userList.data.filter(i => i.id !== payload);
        const negaveUserTemp = state.userList.data.filter(i => i.id === payload).map(i => ({...i, rating: i.rating + 1}))
        return {
            ...state,
            userList: {
                ...state.userList,
                data: tempUserList,
            },
            negativeUsersList:  [...state.negativeUsersList, ...negaveUserTemp]
        }
    });

    builder.addCase(upRating, (state, { payload }) => {
        const tempArray = state.positiveUsersList
            .map((item) => ({...item, rating: item.id === payload ? item.rating! + 1 : item.rating}))
        return {
            ...state,
            positiveUsersList: tempArray
        }
    });
    
    builder.addCase(downRating, (state, { payload }) => {
        const tempArray = state.positiveUsersList
            .map((item) => ({...item, rating: item.id === payload ? item.rating! - 1 : item.rating}))
        return {
            ...state,
            positiveUsersList: tempArray
        }
    });
    
});