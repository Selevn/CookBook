import jwtDecode from 'jwt-decode';

export const AuthCheckerWrapper = () => {
  let tmpStamp;
  let tokenCached;
  return (token) => {
    if (token !== tokenCached) {
      if (token) tmpStamp = jwtDecode(token).exp;
      tokenCached = token;
    }
    if(tmpStamp.toString().length === 10)
      tmpStamp*=1000;
    console.log("token",token);
    console.log("tmpStamp",tmpStamp);
    console.log("new Date()",new Date());
    console.log(">",tmpStamp > new Date());
    console.log("tokenCached",tokenCached);
    return tmpStamp > new Date();
  };
};
