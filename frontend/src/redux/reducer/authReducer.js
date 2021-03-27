import {
  LOAD_USER,
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_INFO_SUCCESS,
  UPDATE_AVATAR,
} from '../actions/actionType';

const auth = (state = { user: {}, currentUser: {} }, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.user,
      };
    case AUTH_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case SIGN_OUT_USER:
      return {
        user: null,
        currentUser: null,
      };
    case AUTH_INFO_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case UPDATE_AVATAR:
      state.user.avatar = action.avatar;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default auth;
