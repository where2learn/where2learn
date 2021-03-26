import {
  LOAD_USER,
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_INFO_SUCCESS,
  UPDATE_AVATAR,
} from "./actionType";

export function loadUser(user) {
  return {
    type: LOAD_USER, // Type of your action
    user: user, // Information carried
  };
}

export function authUser(currentUser) {
  return {
    type: AUTH_USER,
    currentUser: currentUser,
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}

export const authInfoSuccess = (user) => ({
  type: AUTH_INFO_SUCCESS,
  currentUser: user,
});

export const updateAvatarAction = (avatar) => ({
  type: UPDATE_AVATAR,
  avatar: avatar,
});
