import {profileActionTypes} from "../Actions/loginActions";
import {GetData, PutData, Remove} from "../../../LocalStorage/Storage";
const PROFILE = "profile"

const initialState = GetData(PROFILE) || null

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActionTypes.SET_PROFILE:
        {
            PutData(PROFILE, action.payload)
            return action.payload
        }
        case profileActionTypes.LOGOUT:
        {
            Remove(PROFILE)
            return null
        }
        case profileActionTypes.LIKE_RECIPE:
        {
            const inputId = Number(action.payload)
            if(state.profile.likes.recipes.includes(inputId))
                state.profile.likes.recipes = state.profile.likes.recipes.filter(id => id !== inputId)
            else
                state.profile.likes.recipes.push(inputId)
            return {...state}

        }
        case profileActionTypes.LIKE_COOKBOOK:
        {
            const inputId = Number(action.payload)
            let changedArr = [...state.likes.cookBooks]
            if(state)
            {
                if(state.likes.cookBooks.includes(inputId))
                    changedArr = changedArr.filter(id => id !== inputId)
                else
                    changedArr.push(inputId)
            }
            else{
                console.log("profileActionTypes.LIKE_COOKBOOK no person", state)
            }
            PutData(PROFILE, {...state, likes: {recipes: state.likes.recipes, cookBooks: changedArr}})
            return {...state, likes: {recipes: state.likes.recipes, cookBooks: changedArr}}
        }
        default: {
            return state
        }
    }
}