import jwt_decode from "jwt-decode";

export const AuthCheckerWrapper = () => {
    let tmpStamp
    let tokenChached
    return (token) => {
        if(token !== tokenChached)
        {
            console.log("here")
            tmpStamp = jwt_decode(token).exp
            tokenChached = token
        }
        return tmpStamp > new Date()
    }
}