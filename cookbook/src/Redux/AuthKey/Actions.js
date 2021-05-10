export const AuthActions = {
    SET_TOKEN: 'SET_TOKEN',
}

export const authActions = {
    setToken: (payload) => ({type: AuthActions.SET_TOKEN, payload})
}