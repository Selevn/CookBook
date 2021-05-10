export const AuthActions = {
    SET_TOKEN: 'AuthActions.SET_TOKEN',
    LOGOUT: 'AuthActions.LOGOUT'
}

export const authActions = {
    setToken: (payload) => ({type: AuthActions.SET_TOKEN, payload}),
    logOut: () => ({type: AuthActions.LOGOUT})
}