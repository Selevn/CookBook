import { AuthCheckerWrapper } from './AuthChecker';
import { COMMON, MESSAGES, ROUTES } from '../constants';

const AuthChecker = AuthCheckerWrapper();

export const fetchData = async (url, setLoader, settings) => {
  if (typeof setLoader !== typeof (() => {})) {
    setLoader = () => {};
  }
  setLoader(true);
  let localurl = url;
  if (settings) {
    localurl += '?';
    Object.keys(settings).forEach((key) => {
      localurl += `${key}=${settings[key]}&`;
    });
  }
  const response = await fetch(localurl);
  setLoader(false);
  if (response.status === 404) {
    return { redirect: '/404' };
  }
  const data = await response.json();
  return data;
};

export const hasItem = async (type, id) => {
  let url;
  switch (type) {
    case COMMON.PROFILE: {
      url = ROUTES.PROFILE_CHECK;
      break;
    }
    case 'recipe': {
      url = ROUTES.RECIPE_CHECK;
      break;
    }
    case 'cookbook': {
      url = ROUTES.COOKBOOK_CHECK;
      break;
    }
    default: {
      break;
    }
  }
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.status !== 404;
};

export const Login = async (data) => {
  const response = await fetch(ROUTES.LOGIN_ABSOLUTE_ROUTE, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) throw Error(response);
  return response.json();
};
export const SendData = async (url, data, authKey, logOutFunc) => {
  if (AuthChecker(authKey)) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authKey,
      },
    });
    if (response.status !== 200 && response.status !== 401) throw Error(response);
    if (response.status === 401) return { success: false };
    return response.json();
  }
  if (logOutFunc) logOutFunc();
  return { success: false, error: MESSAGES.ERROR.AUTH };
};

export const SendFile = async (url, formData, authKey, logOutFunc) => {
  if (AuthChecker(authKey)) {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: authKey,
      },
    });
    if (response.status !== 200 && response.status !== 401) throw Error(response);
    if (response.status === 401) return { success: false };
    return response.json();
  }
  if (logOutFunc) logOutFunc();
  return { success: false, error: MESSAGES.ERROR.AUTH };
};

export const Register = async (data) => {
  const response = await fetch(ROUTES.REGISTER_ABSOLUTE_ROUTE, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) throw Error(response);
  const answer = await response.json();
  return answer;
};
