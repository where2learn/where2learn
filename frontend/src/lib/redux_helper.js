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
  generateUserDocument,
} from '../firebase';

const fetchUser = (uid) => async (dispatch) => {
  try {
    const user = await getUserInfo(uid);
    // console.log(user);
    dispatch(loadUser(user));
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
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

const login = (email, password) => async (dispatch) => {
  try {
    console.log('login begin');
    const res = await auth.signInWithEmailAndPassword(email, password);
    console.log(res.user);
    console.log('before dispatch');
    dispatch(authUser(res.user));
    console.log('after dispatch');
    await fetchUser(res.user.uid);
    console.log('fetchUser finished');
    return res.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const signup = (email, password) => async (dispatch) => {
  try {
    console.log(email, password);
    const res = await auth.createUserWithEmailAndPassword(email, password);
    console.log(res.user);
    const user = await generateUserDocument(res.user);
    console.log('before dispatch');
    dispatch(authUser(res.user));
    console.log('after dispatch');
    dispatch(loadUser(user));
    console.log('fetch user finished');
    return res.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};

const changeAvatar = (uid, avatar) => (dispatch) => {
  updateAvatar(uid, avatar);
  dispatch(updateAvatarAction(avatar));
};

const signInWithPopup = async (dispatch) => {
  const userAuth = await auth.signInWithPopup(provider);
  dispatch(authUser(userAuth.user));
  console.log(userAuth.user);
  await fetchUser(userAuth.user.uid);
  return userAuth.user;
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
