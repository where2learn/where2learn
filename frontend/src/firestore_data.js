export const constructFullModuleId = (username, module_id) =>
  `${username}\\${module_id}`;

export const constructStarId = (username, full_module_id) =>
  `${username}\\${full_module_id}`;

export const constructModuleObject = ({
  title,
  module_id,
  tags,
  content,
  roadmap,
  media_type,
  type,
  mode,
}) => {
  const data = {
    title,
    module_id,
    tags,
    content,
    roadmap,
    media_type,
    type,
  };
  if (mode === 'add') {
    return data;
  } else if (mode === 'edit') {
    return data;
  } else {
    console.error('invalid mode');
  }
};
