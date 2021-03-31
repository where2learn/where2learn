import { LOAD_TAGS } from './actionType';

export function loadTags(tags) {
  return {
    type: LOAD_TAGS,
    tags: tags,
  };
}
