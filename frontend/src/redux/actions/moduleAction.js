import { LOAD_MODULES, EMPTY_MODULES, LOAD_STAR_MODULES } from './actionType';

export function loadModules(modules) {
  return {
    type: LOAD_MODULES,
    modules: modules,
  };
}

export function clearModules() {
  return {
    type: EMPTY_MODULES,
    modules: [],
  };
}

export function loadStarModules(starModules) {
  return {
    type: LOAD_STAR_MODULES,
    starModules: starModules,
  };
}
