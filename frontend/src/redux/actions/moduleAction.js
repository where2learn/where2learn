import { LOAD_MODULES } from "./actionType";
import { EMPTY_MODULES } from "./actionType";

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
