import {useStore} from "react-redux";

export function useReduxState()
{
    const state = useStore().getState();
    return({
        profile: state.profile || null,
        auth: state.auth || null
    })
}