import {AuthActions} from "./Actions";
import {GetData, PutData, Remove} from "../../LocalStorage/Storage";

const AUTH = "auth"

const initState = {
    auth: GetData(AUTH) || null
}
export const authReducer = (state = initState, action)=>{
    switch(action.type){
        case AuthActions.SET_TOKEN:{
            PutData(AUTH, action.payload)
            return {...state, auth: action.payload}
        }
        case AuthActions.LOGOUT:{
            Remove(AUTH)
            return {...state, auth: null}
        }
        default:{
            return state;
        }
    }
}