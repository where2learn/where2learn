import { combineReducers } from 'redux';

import auth from './authReducer';
import moduleReducer from './moduleReducer';
import tagReducer from './tagReducer';

export const rootReducer = combineReducers({ auth, moduleReducer, tagReducer });
