import {profileActionTypes} from "../Actions/loginActions";
import {GetData, PutData, Remove} from "../../../LocalStorage/Storage";
const PROFILE = "profile"

const initialState = {
    profile: GetData(PROFILE) || null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActionTypes.SET_PROFILE:
        {
            PutData(PROFILE, action.payload)
            return {...state, profile: action.payload}
        }
        case profileActionTypes.LOGOUT:
        {
            Remove(PROFILE)
            return {...state, profile: null}
        }
        default: {
            return state
        }
    }
}