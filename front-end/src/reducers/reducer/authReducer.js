import {LOGIN, LOGOUT, UPDATE} from '../contanst'

const initialState = {
    user: {},
    isAuth: false,
    token: ""
}

export default function authReducer(state = initialState, action) {
    const payload = action.payload;
    switch(action.type) {
        case LOGIN:
            return {...state, ...payload};
        case UPDATE:
            return {...state, user: {...state.user, payload}}
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}