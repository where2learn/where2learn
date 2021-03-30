import {
  loadUser,
  authUser,
  signOutUser,
  updateAvatarAction,
} from '../redux/actions/authActions';

import {
  loadModules,
  clearModules,
  loadStarModules,
} from '../redux/actions/moduleAction';

import {
  auth,
  getUserInfo,
  getModulesByUsername,
  updateAvatar,
  provider,
  getStarModules,
} from '../firebase';

const fetchUser = (uid) => (dispatch) => {
  return getUserInfo(uid).then((user) => {
    // console.log(user);
    dispatch(loadUser(user));
    return user;
  });
};

const fetchModules = (username) => (dispatch) => {
  return getModulesByUsername(username).then((modules) => {
    dispatch(loadModules(modules));
    return modules;
  });
};

const fetchStarModules = (username) => (dispatch) => {
  return getStarModules(username).then((starModules) => {
    dispatch(loadStarModules(starModules));
    return starModules;
  });
};

const login = (email, password) => (dispatch) => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      dispatch(authUser(result));
    })
    .catch((err) => {
      throw err;
    });
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
    loadStarModules: (username) => fetchStarModules(username)(dispatch),
  };
};

export const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.auth,
    modules: state.moduleReducer.modules,
    starModules: state.moduleReducer.starModules,
  };
};
