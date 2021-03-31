import {
  LOAD_MODULES,
  EMPTY_MODULES,
  LOAD_STAR_MODULES,
} from '../actions/actionType';

const moduleReducer = (state = { modules: [], starModules: [] }, action) => {
  switch (action.type) {
    case LOAD_MODULES:
      return {
        ...state,
        modules: action.modules,
      };
    case EMPTY_MODULES:
      return {
        modules: [],
        starModules: [],
      };
    case LOAD_STAR_MODULES:
      return {
        ...state,
        starModules: action.starModules,
      };
    default:
      return state;
  }
};

export default moduleReducer;
