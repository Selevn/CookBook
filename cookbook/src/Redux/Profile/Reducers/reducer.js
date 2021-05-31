import { profileActionTypes } from '../Actions/loginActions';
import { GetData, PutData, Remove } from '../../../LocalStorage/Storage';

const PROFILE = 'profile';

const initialState = GetData(PROFILE) || null;

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SET_PROFILE: {
      PutData(PROFILE, action.payload);
      return action.payload;
    }
    case profileActionTypes.LOGOUT: {
      Remove(PROFILE);
      return null;
    }
    case profileActionTypes.LIKE_RECIPE: {
      const inputId = Number(action.payload);
      let changedArr = [...state.likes.recipes];
      if (state) {
        if (state.likes.recipes.includes(inputId)) changedArr = changedArr.filter((id) => id !== inputId);
        else changedArr.push(inputId);
        PutData(PROFILE, {
          ...state,
          likes: { cookBooks: state.likes.cookBooks, recipes: changedArr },
        });
        return { ...state, likes: { cookBooks: state.likes.cookBooks, recipes: changedArr } };
      }
      break;
    }
    case profileActionTypes.LIKE_COOKBOOK: {
      const inputId = Number(action.payload);
      let changedArr;
      if (state) {
        changedArr = [...state.likes.cookBooks];
        if (state.likes.cookBooks.includes(inputId)) changedArr = changedArr.filter((id) => id !== inputId);
        else changedArr.push(inputId);
        PutData(PROFILE, {
          ...state,
          likes: { recipes: state.likes.recipes, cookBooks: changedArr },
        });
        return { ...state, likes: { recipes: state.likes.recipes, cookBooks: changedArr } };
      }
      break;
    }
    default: {
      return state;
    }
  }
  return state;
};
