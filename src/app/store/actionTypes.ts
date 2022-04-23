export enum ActionTypes {
    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup success',
    SIGNUP_FAILURE  = '[Auth] Signup failure',

    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login success',
    LOGIN_FAILURE  = '[Auth] Login failure',

    FETCH_AVAILABLE_EXERCISES = '[Training] Fetch available exercises',
    FETCH_AVAILABLE_EXERCISES_SUCCESS = '[Training] Fetch available exercises success',
    FETCH_AVAILABLE_EXERCISES_FAILURE = '[Training] Fetch available exercises failure',

    LOGOUT = '[Auth] Logout'
}