import { LOAD_USER, LOAD_MODULES } from "./actionType";

export function loadUser(user) {
  // console.log(user);
  return {
    type: LOAD_USER, // Type of your action
    user: user, // Information carried
  };
}

export function loadModules(modules) {
  return {
    type: LOAD_MODULES,
    modules: modules,
  };
}
