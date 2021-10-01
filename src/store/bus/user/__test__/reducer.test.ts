import { 
    getUsers, 
    currentPage, 
    addPositiveRating, 
    addNegativeRating, 
    upRating, 
    downgrade, 
    banUser, 
    rewardUser 
} from '../actions';
import { axiosError, userMock } from '../../../../../test/mock'
import _ from 'lodash';
import { initialState, userReducer } from '../reducer';



describe('test user load', () => {
	test('start action', () => {
		expect(userReducer(initialState, getUsers.start())).toEqual({
			...initialState,
			userList: {
				...initialState.userList,
				loading: true,
			}
		})
	})


	test('stop action', () => {
		expect(userReducer(initialState, getUsers.stop())).toEqual({
			...initialState,
			userList: {
				...initialState.userList,
				loading: false,
			}
		})
	})
	
	test('fill action', () => {
		expect(userReducer(initialState, getUsers.fill([]))).toEqual({
			...initialState,
			userList: {
				...initialState.userList,
				data: []
			}
		})
	})
	
	test('error action', () => {
		expect(userReducer(initialState, getUsers.error(axiosError))).toEqual({
			...initialState,
			userList: {
				...initialState.userList,
				error: axiosError
			}
		})
	})
})


describe('test user reducers', () => {

    test('cahnge currentPage', () => {
		expect(userReducer(initialState, currentPage(1))).toEqual({
			...initialState,
			currentPage: 1
		})
	})

    test('Нажатие на плюс из левого списка', () => {
        let mockInitialState = _.cloneDeep(initialState);
        mockInitialState.userList.data = [{...userMock}]
        let userMockUp = {...userMock, rating: 1};
    
		expect(userReducer(mockInitialState, addPositiveRating({userId: 4122}))).toEqual({
			...mockInitialState,
            userList: {
                ...mockInitialState.userList,
                data: mockInitialState.userList.data.filter(i => i.id !== userMock.id)
            },
            positiveUsersList: [...mockInitialState.positiveUsersList, userMockUp],
		})
	})
    
    test('нажатие на минут из левого списка', () => {
        let mockInitialState = _.cloneDeep(initialState);
        mockInitialState.userList.data = [{...userMock}]
        mockInitialState.activeTab = '2'
        let userMockDown = {...userMock, rating: -1};

    
		expect(userReducer(mockInitialState, addNegativeRating({userId: 4122}))).toEqual({
			...mockInitialState,
            userList: {
                ...mockInitialState.userList,
                data: mockInitialState.userList.data.filter(i => i.id !== userMock.id)
            },
            negativeUsersList: [...mockInitialState.positiveUsersList, userMockDown],
		})
	})
    

    describe('нажатие на плюс из табов', () => {
        test('нажатие на плюс из вкладки позитивные', () => {
            let mockInitialState = _.cloneDeep(initialState);
            mockInitialState.positiveUsersList = [{...userMock}]
            let userMockDown = {...userMock, rating: 2};
        
            expect(userReducer(mockInitialState, upRating({userId: 4122, type: 'POSITIVE'}))).toEqual({
                ...mockInitialState,
                positiveUsersList: [userMockDown],
            })
        })
        test('нажатие на плюс из вкладки негативные', () => {
            let mockInitialState = _.cloneDeep(initialState);
            mockInitialState.negativeUsersList = [{...userMock, rating: -3}]
            let userMockDown = {...userMock, rating: -2};
        
            expect(userReducer(mockInitialState, upRating({userId: 4122, type: 'NEGATIVE'}))).toEqual({
                ...mockInitialState,
                positiveUsersList: [],
                negativeUsersList: [userMockDown]
            })
        })
	})


    describe('нажатие на минус из табов', () => {
        test('нажатие на минус из вкладки позитивные', () => {
            let mockInitialState = _.cloneDeep(initialState);
            mockInitialState.positiveUsersList = [{...userMock}]
            let userMockDown = {...userMock, rating: 0};
        
            expect(userReducer(mockInitialState, downgrade({userId: 4122, type: 'POSITIVE'}))).toEqual({
                ...mockInitialState,
                positiveUsersList: [userMockDown],
            })
        })
        test('нажатие на минус из вкладки негативные', () => {
            let mockInitialState = _.cloneDeep(initialState);
            mockInitialState.negativeUsersList = [{...userMock, rating: -3}]
            let userMockDown = {...userMock, rating: -4};
        
            expect(userReducer(mockInitialState, downgrade({userId: 4122, type: 'NEGATIVE'}))).toEqual({
                ...mockInitialState,
                positiveUsersList: [],
                negativeUsersList: [userMockDown]
            })
        })
	})

    test('удаление пользователя (отправка в бан)', () => {
        let mockInitialState = {...initialState};
        mockInitialState.positiveUsersList = [{...userMock}]
    
        expect(userReducer(mockInitialState, banUser({userId: 4122}))).toEqual({
            ...mockInitialState,
            negativeUsersList: [],
        })
    })

    test('вознаграждение пользователя', () => {
        let mockInitialState = _.cloneDeep(initialState);
        mockInitialState.positiveUsersList = [{...userMock}]
        //@ts-ignore
        console.log('___test', global.__)
        
        expect(userReducer(mockInitialState, rewardUser({userId: 4122}))).toEqual({
            ...mockInitialState,
            positiveUsersList: [],
            userList: {
                ...mockInitialState.userList,
                data: [{...userMock, rating: 0}]
            },
        })
    })
})
