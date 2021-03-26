import {
  loadUser,
  authUser,
  signOutUser,
  updateAvatarAction,
} from "../redux/actions/authActions";

import { loadModules, clearModules } from "../redux/actions/moduleAction";

import {
  getUserInfo,
  getModulesByUsername,
  updateAvatar,
  provider,
} from "../firebase";

import { auth } from "../firebase";

const fetchUser = (uid) => (dispatch) => {
  getUserInfo(uid).then((data) => {
    dispatch(loadUser(data));
  });
};

const fetchModules = (username) => (dispatch) => {
  getModulesByUsername(username).then((modules) => {
    dispatch(loadModules(modules));
  });
};

const login = (email, password) => (dispatch) => {
  const user = auth.signInWithEmailAndPassword(email, password);
  dispatch(authUser(user));
};

const signup = (email, password) => (dispatch) => {
  const user = auth.createUserWithEmailAndPassword(email, password);
  dispatch(authUser(user));
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

const changeAvatar = (uid, avatar) => (dispatch) => {
  updateAvatar(uid, avatar);
  dispatch(updateAvatarAction(avatar));
};

const signInWithPopup = (dispatch) => {
  const userAuth = auth.signInWithPopup(provider);
  dispatch(authUser(userAuth));
  return userAuth;
};

const setStoreToNull = (dispatch) => {
  dispatch(signOutUser());
  dispatch(clearModules());
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (uid) => fetchUser(uid)(dispatch),
    loadModules: (username) => fetchModules(username)(dispatch),
    login: (email, password) => login(email, password)(dispatch),
    updateAvatar: (uid, avatar) => changeAvatar(uid, avatar)(dispatch),
    logout: () => setStoreToNull(dispatch),
    signInWithGoogle: () => signInWithPopup(dispatch),
    signup: (email, password) => signup(email, password)(dispatch),
  };
};

export const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.auth,
    // user: state.auth.user,
    // currentUser: state.auth.currentUser,
    modules: state.moduleReducer.modules,
  };
};
