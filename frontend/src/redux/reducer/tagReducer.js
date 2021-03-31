import { LOAD_TAGS } from '../actions/actionType';

const tagReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case LOAD_TAGS:
      return {
        ...state,
        tags: action.tags,
      };
    default:
      return state;
  }
};

export default tagReducer;
