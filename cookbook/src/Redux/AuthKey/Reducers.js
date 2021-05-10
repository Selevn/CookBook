import {AuthActions} from "./Actions";
import {GetData, PutData} from "../../LocalStorage/Storage";

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
        default:{
            return state;
        }
    }
}