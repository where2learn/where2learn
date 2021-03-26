import {
  loadUser,
  loadModules,
  authUser,
  signOutUser,
  updateAvatarAction,
} from "../redux/actions/authActions";
import {
  getUserInfo,
  getModulesByUsername,
  updateAvatar,
  provider,
} from "../firebase";
import { auth } from "../firebase";
import { useRouteMatch } from "react-router";

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

// const updateEmail = (currentUser, email) => (dispatch) => {
//   return currentUser.updateEmail(email);
// };

// const updatePassword = (currentUser, password) => {
//   return currentUser.updatePassword(password);
// };

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

const changeAvatar = (uid, avatar) => (dispatch) => {
  updateAvatar(uid, avatar);
  dispatch(updateAvatarAction(avatar));
};

const signInWithPopup = () => {
  const userAuth = auth.signInWithPopup(provider);
  return userAuth;
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (uid) => fetchUser(uid)(dispatch),
    loadModules: (username) => fetchModules(username)(dispatch),
    login: (email, password) => login(email, password)(dispatch),
    updateAvatar: (uid, avatar) => changeAvatar(uid, avatar)(dispatch),
    logout: () => signOutUser(),
    signInWithGoogle: () => signInWithPopup(),
    signup: (email, password) => signup(email, password)(dispatch),
    // updateEmail: (email) => updateEmail(email)(dispatch),
    // updatePassword: (password) => updatePassword(password)(dispatch),
  };
};

export const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    modules: state.auth.modules,
    currentUser: state.auth.currentUser,
  };
};
