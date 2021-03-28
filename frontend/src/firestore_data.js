export const constructFullModuleId = (username, module_id) =>
  `${username}\\${module_id}`;

export const constructStarId = (username, full_module_id) =>
  `${username}\\${full_module_id}`;

export const constructModuleObject = (moduleObj) => {
  const tagsDict = {};
  for (const tag in moduleObj.tags) {
    tagsDict[tag] = true;
  }
  const data = {
    title: moduleObj.title,
    module_id: moduleObj.module_id,
    tags: tagsDict,
    content: moduleObj.content,
    roadmap: moduleObj.roadmap,
    media_type: moduleObj.media_type,
    type: moduleObj.type,
    description: moduleObj.description,
    updated_at: new Date(),
  };
  if (moduleObj.mode === 'add') {
    return { ...data, created_at: new Date() };
  } else if (moduleObj.mode === 'edit') {
    return data;
  } else {
    console.error('invalid mode');
  }
};

export const convertTagsObj2Array = (tags) => {
  if (!tags) return [];
  const tagsArray = [];
  for (const [key, value] of Object.entries(tags)) {
    if (value === true) {
      tagsArray.push(key.toLowerCase());
    }
  }
  return tagsArray;
};

export const convertTagsArray2Obj = (tags) => {
  const obj = {};
  for (const tag of tags) {
    obj[tag] = true;
  }
  return obj;
};
