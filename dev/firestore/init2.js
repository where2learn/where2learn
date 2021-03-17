const admin = require("firebase-admin");
const firestore = admin.firestore;
const serviceAccount = require("../serviceAccountKey.json");
const NUM_TO_CREATE = 10;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const sampleTags = ["python", "reactjs", "vuejs", "java", "sql"];
const tag_count_map = {};
for (let i = 0; i < sampleTags.length; i++) {
  tag_count_map[sampleTags[i]] = 0;
}
const getUser = (username) => {
  return {
    username,
    theme: Math.random() > 0.5 ? "dark" : "light",
    credit: Math.floor(Math.random() * 1000),
    email: `${username}@where2learn.com`,
  };
};

const getModule = (
  title,
  author,
  children = [],
  media_type = ["image", "code"]
) => {
  return {
    title,
    author,
    createdAt: firestore.Timestamp.now(),
    updatedAt: firestore.Timestamp.now(),
    type: Math.random() > 0.2 ? "regular" : "roadmap",
    media_type,
    children,
    content: "module content",
    num_star: 0,
    tags: [],
  };
};

const getTag = (value, count) => {
  return {
    value,
    count,
  };
};

const getStar = (username, module) => {
  return {
    username,
    module,
  };
};

const tag_values = [...Array(NUM_TO_CREATE).keys()].map((i) => `tag${i}`);
const usernames = [...Array(NUM_TO_CREATE).keys()].map((i) => `user${i}`);
const module_names = [...Array(NUM_TO_CREATE * 3).keys()].map(
  (i) => `module${i}`
);

(async () => {
  // create users first
  const users = usernames.map((username) => {
    return getUser(username);
  });

  // create users
  let batch = db.batch();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userRef = db.collection("users").doc(user.username);
    batch.set(userRef, user);
  }
  await batch.commit();

  // create modules
  const modules = module_names.map((module_name) =>
    getModule(
      module_name,
      usernames[Math.floor(Math.random() * usernames.length)]
    )
  );
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    const randTagCount = Math.floor(Math.random() * sampleTags.length);
    for (let j = 0; j < randTagCount; j++) {
      module.tags.push(sampleTags[j]);
      tag_count_map[sampleTags[j]] = tag_count_map[sampleTags[j]] + 1;
    }
  }

  batch = db.batch();
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i];
    const module_id = `${module.author}\\${module.title}`;
    const moduleRef = db.collection("modules").doc(module_id);
    batch.set(moduleRef, module);
  }
  await batch.commit();

  // create pairs
  const stars = [];
  for (let i = 0; i < users.length; i++) {
    const randModCount = Math.floor(Math.random() * modules.length);
    modules.sort(() => 0.5 - Math.random());

    users.sort(function () {
      return 0.5 - Math.random();
    });
    for (let j = 0; j < randModCount; j++) {
      stars.push(getStar(users[i].username, modules[j].title));
    }
  }

  batch = db.batch();
  stars.forEach(async (star) => {
    const starId = `${star.username}\\${star.module}`;
    const starRef = db.collection("stars").doc(starId);
    batch.set(starRef, star);
  });
  await batch.commit();

  // create tag
  const tags = sampleTags.map((tag) => getTag(tag, tag_count_map[tag]));
  batch = db.batch();
  for (let i = 0; i < tags.length; i++) {
    const tagRef = db.collection("tags").doc(tags[i].value);
    batch.set(tagRef, tags[i]);
  }
  await batch.commit();
  console.log("Finished");
  process.exit(0);
})();
