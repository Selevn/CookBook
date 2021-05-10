export const profileActionTypes = {
    SET_PROFILE: 'PROFILE.SET_PROFILE',
    LOGOUT: 'PROFILE.LOGOUT'
}

export const profileActions = {
    setProfile: (payload) => ({type: profileActionTypes.SET_PROFILE, payload}),
    logOut: () => ({type: profileActionTypes.LOGOUT})
}