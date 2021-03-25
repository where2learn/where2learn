import {
  loadUser,
  loadModules,
  authUser,
  signOutUser,
  updateAvatarAction,
} from "../redux/actions/authActions";
import { getUserInfo, getModulesByUsername, updateAvatar } from "../firebase";
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

const changeAvatar = (uid, avatar) => (dispatch) => {
  updateAvatar(uid, avatar);
  dispatch(updateAvatarAction(avatar));
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (uid) => fetchUser(uid)(dispatch),
    loadModules: (username) => fetchModules(username)(dispatch),
    login: (email, password) => login(email, password)(dispatch),
    updateAvatar: (uid, avatar) => changeAvatar(uid, avatar)(dispatch),
    logout: () => signOutUser(),
  };
};

export const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    modules: state.auth.modules,
    currentUser: state.auth.currentUser,
  };
};
