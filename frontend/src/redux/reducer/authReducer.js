import { LOAD_USER, LOAD_MODULES } from "../actions/actionType";

const auth = (state = { user: {}, modules: [] }, action) => {
  switch (action.type) {
    case LOAD_USER:
      // console.log(action.user);
      return { user: action.user, modules: state.modules };
    case LOAD_MODULES:
      return { user: state.user, modules: action.modules };
    default:
      return state;
  }
};

export default auth;
