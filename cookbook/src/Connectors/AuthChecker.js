import jwtDecode from 'jwt-decode';

export const AuthCheckerWrapper = () => {
  let tmpStamp;
  let tokenCached;
  return (token) => {
    if (token !== tokenCached) {
      if (token) tmpStamp = jwtDecode(token).exp;
      tokenCached = token;
    }
    return tmpStamp > new Date();
  };
};
