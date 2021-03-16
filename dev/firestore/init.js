const fs = require("fs");
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const getUser = (username, star = []) => {
  return {
    theme: Math.random() > 0.5 ? "dark" : "light",
    star,
    credit: Math.floor(Math.random() * 1000),
    username,
    email: `${username}@where2learn.com`,
  };
};

const getModule = (
  title,
  tags = [],
  author = null,
  children = [],
  media_type = []
) => {
  return {
    type: Math.random() > 0.1 ? "regular" : "roadmap",
    media_type: ["image", "code"],
    tags,
    title,
    author,
    children,
    content: "module content",
    num_star: Math.floor(Math.random() * 10),
  };
};

const getTag = (value = null, level = 1, modules = []) => {
  return {
    level,
    value,
    modules,
  };
};
const NUM_TO_CREATE = 10;
const tag_values = [...Array(NUM_TO_CREATE).keys()].map((i) => `tag${i}`);
const usernames = [...Array(NUM_TO_CREATE).keys()].map((i) => `user${i}`);
const module_names = [...Array(NUM_TO_CREATE * 3).keys()].map(
  (i) => `module${i}`
);

const tags = tag_values.map((tag_value) => {
  return getTag(tag_value, 1, []);
});

const users = usernames.map((username) => {
  return getUser(username);
});

const modules = module_names.map((module_name) => {
  return getModule((title = module_name));
});

const module_length = module_names.length;
const user_length = usernames.length;
const tag_length = tag_values.length;

(async () => {
  // create all users
  let batch = db.batch();
  await (async () => {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userRef = db.collection("users").doc(user.username);
      batch.set(userRef, user);
    }
    await batch.commit();
  })();

  // create all tags
  batch = db.batch();
  await (async () => {
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const tagRef = db.collection("tags").doc(tag.value);
      batch.set(tagRef, tag);
    }
    await batch.commit();
  })();

  // map tag to module
  batch = db.batch();
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    const num_tag = tag_length > 5 ? 5 : tag_length;
    const tag_id_set = new Set();
    let count = 0;
    while (tag_id_set.size < num_tag) {
      tag_id_set.add(Math.floor(Math.random() * tag_length));
    }
    for (let i = 0; i < tag_id_set.size; i++) {
      const tagRef = db.collection("tags").doc(tags[i].value);
      module.tags.push(tagRef);
    }
  }

  // map module to user
  batch = db.batch();

  for (let index = 0; index < modules.length; index++) {
    const module = modules[index];
    const user = users[Math.floor(Math.random() * user_length)];
    const userRef = db.collection("users").doc(user.username);
    module.author = userRef;
  }

  // create all modules
  batch = db.batch();
  await (async () => {
    for (let i = 0; i < modules.length; i++) {
      module = modules[i];
      const userRef = module.author;
      const doc = await userRef.get();
      const module_id = `${doc.data().username}\\${module.title}`;
      module.id = module_id;
      const moduleRef = db.collection("modules").doc(module_id);
      batch.set(moduleRef, module);
    }
    await batch.commit();
  })();

  // map modules back to tags
  await (async () => {
    batch = db.batch();
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const moduleRef = db.collection("modules").doc(module.id);
      const doc = await moduleRef.get();
      const module_data = doc.data();
      module_data.tags.forEach(async (tagRef) => {
        batch.update(tagRef, {
          modules: admin.firestore.FieldValue.arrayUnion(moduleRef),
        });
      });
    }
    await batch.commit();
  })();
  console.log("Finished");
})();
