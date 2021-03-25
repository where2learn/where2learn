import {
  loadUser,
  loadModules,
  authUser,
  signOutUser,
  updateAvatarAction,
} from "../redux/actions/authActions";
import { getUserInfo, getModulesByUsername, updateAvatar } from "../firebase";
import { auth } from "../firebase";

// export const mapStateToProps = (state) => ({
//   ...state,
// });

const fetchUser = (uid) => (dispatch) => {
  getUserInfo(uid).then((data) => {
    // console.log(data);
    dispatch(loadUser(data));
  });
};

const fetchModules = (username) => (dispatch) => {
  getModulesByUsername(username).then((modules) => {
    // console.log(modules);
    dispatch(loadModules(modules));
  });
};

const login = (email, password) => (dispatch) => {
  const user = auth.signInWithEmailAndPassword(email, password);
  dispatch(authUser(user));
};

const changeAvatar = (avatar) => (dispatch) => {
  dispatch(updateAvatarAction(avatar));
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (uid) => fetchUser(uid)(dispatch),
    loadModules: (username) => fetchModules(username)(dispatch),
    login: (email, password) => login(email, password)(dispatch),
    updateAvatar: (avatar) => changeAvatar(avatar)(dispatch),
  };
};

export const mapStateToProps = (state) => {
  // console.log(state.auth);
  return {
    user: state.auth.user,
    modules: state.auth.modules,
    currentUser: state.auth.currentUser,
  };
};
