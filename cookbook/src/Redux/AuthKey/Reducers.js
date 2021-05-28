import { AuthActions } from './Actions';
import { GetData, PutData, Remove } from '../../LocalStorage/Storage';

const AUTH = 'auth';

const initState = GetData(AUTH) || null;
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AuthActions.SET_TOKEN: {
      PutData(AUTH, action.payload);
      return action.payload;
    }
    case AuthActions.LOGOUT: {
      Remove(AUTH);
      return null;
    }
    default: {
      return state;
    }
  }
};
