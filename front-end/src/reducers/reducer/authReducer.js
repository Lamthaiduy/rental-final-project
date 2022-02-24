import {LOGIN, LOGOUT} from '../contanst'

const initialState = {
    user: {},
    isAuth: false,
    token: ""
}

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            const payload = action.payload;
            return {...state, ...payload};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}