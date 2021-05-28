import jwt_decode from 'jwt-decode';

export const AuthCheckerWrapper = () => {
  let tmpStamp;
  let tokenCached;
  return (token) => {
    if (token !== tokenCached) {
      if (token) tmpStamp = jwt_decode(token).exp;
      tokenCached = token;
    }
    return tmpStamp > new Date();
  };
};
