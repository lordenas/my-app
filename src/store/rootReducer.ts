import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from './bus/user/reducer'

export const rootReducer = combineReducers({
    users: userReducer
});
  
  
  
export type AppStore = ReturnType<typeof rootReducer>