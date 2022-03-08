import {LOGIN, LOGOUT, UPDATE} from '../contanst'

export const loginAction = function (payload) {
    return {type: LOGIN, payload: payload};
}

export const updateProfile = function(payload) {
    return {type: UPDATE, payload}
}

export const logoutAction = function () {
    return {type: LOGOUT}
}