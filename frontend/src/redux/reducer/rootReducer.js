import { combineReducers } from 'redux';

import auth from './authReducer';
import moduleReducer from './moduleReducer';

export const rootReducer = combineReducers({ auth, moduleReducer });
