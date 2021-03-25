import {
  LOAD_USER,
  LOAD_MODULES,
  LOGIN,
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_INFO_SUCCESS,
} from "../actions/actionType";

const auth = (state = { user: {}, modules: [], currentUser: {} }, action) => {
  switch (action.type) {
    case LOAD_USER:
      // console.log(action.user);
      return {
        user: action.user,
        modules: state.modules,
        currentUser: state.currentUser,
      };
    case LOAD_MODULES:
      return {
        user: state.user,
        modules: action.modules,
        currentUser: state.currentUser,
      };
    case LOGIN:
      // console.log(action.currentUser);
      return {
        user: state.user,
        modules: state.modules,
        currentUser: action.currentUser,
      };
    case AUTH_USER:
      return {
        user: state.user,
        modules: state.modules,
        currentUser: action.currentUser,
      };
    case SIGN_OUT_USER:
      return {
        user: state.user,
        modules: state.modules,
        currentUser: action.currentUser,
      };
    case AUTH_INFO_SUCCESS:
      return {
        user: state.user,
        modules: state.modules,
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
};

export default auth;
