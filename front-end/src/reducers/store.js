import {createStore, combineReducers, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import authReducer from './reducer/authReducer';
import storage from 'redux-persist/lib/storage';


const mainReducer = combineReducers({
    authReducer
})
const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, mainReducer)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(persistedReducer, composeEnhancers());

export const persistor = persistStore(store);