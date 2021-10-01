import { createReducer } from "@reduxjs/toolkit";
import { 
    addNegativeRating, 
    addPositiveRating, 
    banUser, 
    cleareUser, 
    currentPage, 
    downgrade, 
    getUsers, 
    rewardUser, 
    upRating
} from "./actions";
import { InitialStateUsers, User } from "./types";
import _ from 'lodash'

export const initialState: InitialStateUsers = {
    currentPage: 1,
    userList: {
        data: [],
        loading: false,
        error: null
    },
    positiveUsersList: [],
    negativeUsersList: [], 
    activeTab: '1' //переключать активной вкладки. Type string требуется для ant.des
}

export const userReducer = createReducer(initialState, (builder) => {
    //обработка загрузки пользователей 
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

    //переключатель страницы для загрузки следующих пользователей
    builder.addCase(currentPage, (state, { payload }) => ({
        ...state,
        currentPage: payload
    }));


    //переводим пользователя во вкладку с позитивным рейтингом
    // этот action срабатывает только из левого списка
    builder.addCase(addPositiveRating, (state, { payload }) => {
        let findUser = _.cloneDeep(state.userList.data.filter(i => i.id === payload.userId))
        findUser[0].rating = 1
        return {
            ...state,
            userList: {
                ...state.userList,
                data: state.userList.data.filter(i => i.id !== payload.userId),
            },
            positiveUsersList: [...state.positiveUsersList, ...findUser],
            activeTab: '1'
        }
    })

    //переводим пользователя во вкладку с негативным рейтингом
    // этот action срабатывает только из левого списка
    builder.addCase(addNegativeRating, (state, { payload }) => {
        let findUser = _.cloneDeep(state.userList.data.filter(i => i.id === payload.userId))
        findUser[0].rating = -1
        return {
            ...state,
            userList: {
                ...state.userList,
                data: state.userList.data.filter(i => i.id !== payload.userId),
            },
            negativeUsersList: [...state.negativeUsersList, ...findUser],
            activeTab: '2'
        }
    })

    //поднимаем рейтинг пользователю
    // type - флаг, вызова этого акшена. Так акшен знает с какой вкладки был вызван
    builder.addCase(upRating, (state, { payload }) => {
        let positive = _.cloneDeep(state.positiveUsersList);
        let negative = _.cloneDeep(state.negativeUsersList);

        if(payload.type === 'NEGATIVE') {
            const findIndexUser = negative.findIndex(i => i.id === payload.userId);
            negative[findIndexUser].rating = Math.min(negative[findIndexUser].rating + 1, 5);

            if(negative[findIndexUser].rating > 0) {
                positive.push(negative[findIndexUser])
                negative = negative.filter(i => i.id !== payload.userId)
            }
        }

        if(payload.type === 'POSITIVE') {
            const findIndexUser = positive.findIndex(i => i.id === payload.userId);
            positive[findIndexUser].rating = Math.min(positive[findIndexUser].rating + 1, 5);
        }
        
        return {
            ...state,
            positiveUsersList: [...positive],
            negativeUsersList: [...negative]
        }
    }); 
    
    builder.addCase(downgrade, (state, { payload }) => {
        let positive = _.cloneDeep(state.positiveUsersList);
        let negative = _.cloneDeep(state.negativeUsersList);

        if(payload.type === 'POSITIVE') {
            const findIndexUser = positive.findIndex(i => i.id === payload.userId);
            positive[findIndexUser].rating = Math.max(positive[findIndexUser].rating - 1, -5);

            if(positive[findIndexUser].rating < 0) {
                negative.push(positive[findIndexUser])
                positive = positive.filter(i => i.id !== payload.userId)
            }
        }

        if(payload.type === 'NEGATIVE') {
            const findIndexUser = negative.findIndex(i => i.id === payload.userId);
            negative[findIndexUser].rating = Math.max(negative[findIndexUser].rating - 1, -5);
        }
        
        return {
            ...state,
            positiveUsersList: [...positive],
            negativeUsersList: [...negative]
        }
    });
    //отправляем юзера в бан (удаляем)
    builder.addCase(banUser, (state, { payload }) => ({
        ...state,
        negativeUsersList: state.negativeUsersList.filter(i => i.id !== payload.userId)
    }));
    //вознаграждение пользователя
    //по ТЗ его нужно отправить в левый список
    //это же действие подходит и для удаления при достижении 0
    builder.addCase(rewardUser, (state, { payload }) => {
        let findUser = _.cloneDeep(state.positiveUsersList.filter(i => i.id === payload.userId))
        findUser[0].rating = 0

        return {
            ...state,
            positiveUsersList: state.positiveUsersList.filter(i => i.id !== payload.userId),
            userList: {
                ...state.userList,
                data: [...state.userList.data, ...findUser]
            }
        }
    });

    //проверка на сохраненых пользователй с 0 рейтингом;
    builder.addCase(cleareUser, (state) => {
        let findUserPositive = state.positiveUsersList.filter(i => i.rating === 0)
        let findUserNegative= state.negativeUsersList.filter(i => i.rating === 0)

        return {
            ...state,
            positiveUsersList: state.positiveUsersList.filter(i => i.rating !== 0),
            negativeUsersList: state.negativeUsersList.filter(i => i.rating !== 0),
            userList: {
                ...state.userList,
                data: [...state.userList.data, ...findUserPositive, ...findUserNegative],
            },
            
        }
    });
});