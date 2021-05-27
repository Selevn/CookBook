import {AuthCheckerWrapper} from "./AuthChecker";
import {MESSAGES} from "../constants";

const AuthChecker = AuthCheckerWrapper();

export const fetchData = async (url, setLoader, settings) => {
    if (typeof setLoader !== typeof (() => {
    }))
        setLoader = () => {
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
    if (response.status !== 200) throw Error(response);
    const data = await response.json();
    return data;
};

export const Login = async ( data) => {
    const response = await fetch('/api/login/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status !== 200) throw Error(response);
    return await response.json();
};
export const SendData = async (url, data, authKey, logOutFunc) => {
    if (AuthChecker(authKey)) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authKey
            }
        });
        if (response.status !== 200 && response.status !== 401) throw Error(response);
        if (response.status === 401) return {success: false};
        return await response.json();
    }
    logOutFunc && logOutFunc()
    return {success: false, error: MESSAGES.ERROR.AUTH}
};

export const SendFile = async (url, formData, authKey, logOutFunc) => {
    if (AuthChecker(authKey)) {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': authKey
            }
        });
        if (response.status !== 200 && response.status !== 401) throw Error(response);
        if (response.status === 401) return {success: false};
        return await response.json();
    }
    logOutFunc && logOutFunc()
    return {success: false, error: MESSAGES.ERROR.AUTH}

};


export const Register = async (data) => {
    const response = await fetch('/api/register/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status !== 200) throw Error(response);
    const answer = await response.json();
    return answer;
};


