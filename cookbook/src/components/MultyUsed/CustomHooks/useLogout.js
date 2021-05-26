import {useHistory} from "react-router-dom";
import {useCallback} from "react";
import {profileActions} from "../../../Redux/Profile";
import {authActions} from "../../../Redux/AuthKey";
import {useDispatch} from "react-redux";

export const useLogout = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    return useCallback(() => {
        history.push('/')
        dispatch(profileActions.logOut());
        dispatch(authActions.logOut());
    }, [])
}