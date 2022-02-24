import {LOGIN, LOGOUT} from '../contanst'

export const loginAction = function (payload) {
    return {type: LOGIN, payload: payload};
}

export const logoutAction = function () {
    return {type: LOGOUT}
}