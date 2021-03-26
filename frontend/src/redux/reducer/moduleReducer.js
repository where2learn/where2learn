import { LOAD_MODULES, EMPTY_MODULES } from "../actions/actionType";

const moduleReducer = (state = { modules: [] }, action) => {
  switch (action.type) {
    case LOAD_MODULES:
      return {
        ...state,
        modules: action.modules,
      };
    case EMPTY_MODULES:
      return {
        modules: [],
      };
    default:
      return state;
  }
};

export default moduleReducer;
