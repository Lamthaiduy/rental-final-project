import {createStore, combineReducers, compose} from 'redux';
import authReducer from './reducer/authReducer';
const mainReducer = combineReducers({
    authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(mainReducer, composeEnhancers());
