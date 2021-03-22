import { loadUser, loadModules } from "../redux/actions/authActions";
import { getUserInfo, getModulesByUsername } from "../firebase";

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

export const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (uid) => fetchUser(uid)(dispatch),
    loadModules: (username) => fetchModules(username)(dispatch),
  };
};

export const mapStateToProps = (state) => {
  // console.log(state.auth);
  return {
    user: state.auth.user,
    modules: state.auth.modules,
  };
};
