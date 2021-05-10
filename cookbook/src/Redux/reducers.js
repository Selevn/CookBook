import {combineReducers} from "redux";

import {profileReducer as profile} from "./Profile";
import {authReducer as auth} from "./AuthKey";

export const reducers = combineReducers({
    profile,
    auth
})