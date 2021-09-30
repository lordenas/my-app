import { createReducer } from "@reduxjs/toolkit";
import { addNegativeRating, addPositiveRating, currentPage, downRating, getUsers, upRating } from "./actions";
import { InitialStateUsers, User } from "./types";

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
        let modified: User[] = payload.map((i) => ({...i, rating: 0, typeRating: 'NEUTRAL'}))
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
        const tempUserList: User[] = state.userList.data.map(i => {
            if(i.id === payload) {
                return {
                    ...i, 
                    rating: Math.min(i.rating + 1, 5),
                    typeRating: i.rating + 1 > 0 ? 'POSITIVE' : 'NEGATIVE'
                }
            } else {
                return i
            }
        });

        return {
            ...state,
            userList: {
                ...state.userList,
                data: tempUserList,
            },
        }
    });

    builder.addCase(addNegativeRating, (state, { payload }) => {

        const tempUserList: User[] = state.userList.data.map(i => {
            if(i.id === payload) {
                return {
                    ...i, 
                    rating: Math.max(i.rating - 1, -5),
                    typeRating: i.rating - 1 > 0 ? 'POSITIVE' : 'NEGATIVE'
                }
            } else {
                return i
            }
        });

        const positiveUserTemp = state.userList.data.filter(i => i.id === payload).map(i => ({...i, rating: i.rating + 1}))
        return {
            ...state,
            userList: {
                ...state.userList,
                data: tempUserList,
            },
        }
    });


    

    builder.addCase(upRating, (state, { payload }) => {
        const tempArray = state.positiveUsersList
            .map((item) => ({...item, rating: item.id === payload ? Math.min(item.rating + 1, 5) : item.rating}));

        return {
            ...state,
            positiveUsersList: tempArray
        }
    });
    
    builder.addCase(downRating, (state, { payload }) => {
        const tempArray = state.positiveUsersList
            .map((item) => ({...item, rating: item.id === payload ? Math.max(item.rating - 1, -5) : item.rating}));
            
        return {
            ...state,
            positiveUsersList: tempArray
        }
    });
    
});