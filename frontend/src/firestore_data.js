export const constructFullModuleId = (username, module_id) =>
  `${username}\\${module_id}`;

export const constructStarId = (username, full_module_id) =>
  `${username}\\${full_module_id}`;
