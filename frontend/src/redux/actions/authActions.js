import {
  LOAD_USER,
  LOAD_MODULES,
  LOGIN,
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_INFO_SUCCESS,
} from "./actionType";

export function loadUser(user) {
  // console.log(user);
  return {
    type: LOAD_USER, // Type of your action
    user: user, // Information carried
  };
}

export function loadModules(modules) {
  return {
    type: LOAD_MODULES,
    modules: modules,
  };
}

// export function login(currentUser) {
//   return {
//     type: LOGIN,
//     currentUser: currentUser,
//   };
// }

export function authUser(currentUser) {
  return {
    type: AUTH_USER,
    currentUser: currentUser,
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
    currentUser: null,
  };
}

export const authInfoSuccess = (user) => ({
  type: AUTH_INFO_SUCCESS,
  currentUser: user,
});
