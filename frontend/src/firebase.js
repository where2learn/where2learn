import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { constructStarId } from './firestore_data';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
});
// enable persistence (offline data access)
firebase
  .firestore()
  .enablePersistence()
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log('enable persistence failed: failed-precondition');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log('enable persistence failed: unimplemented');
    }
  });

export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = app.auth();

export const firestore = firebase.firestore();
export default app;
// console.log(firebase.firestore().Timestamp.now);
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  // console.log(additionalData);
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, uid } = user;
    console.log(email);
    try {
      await userRef.set({
        email: email,
        theme: 'light',
        credit: 0,
        username: null,
        uid: uid,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const usernameExists = async (username) => {
  try {
    const snapshot = await firestore
      .collection('users')
      .where('username', '==', username)
      .get();
    return snapshot.size > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUsername = (uid, username) => {
  return firestore.collection('users').doc(uid).update({ username });
};

// TAGs

export const getAllTagCounts = async () => {
  const snapshot = await firebase.firestore().collection('tags').get();
  return snapshot.docs.map((doc) => doc.data());
};

// Module Related
export const getModules = async (limit) => {
  const snapshot = await firebase
    .firestore()
    .collection('modules')
    .orderBy('num_star', 'desc')
    // .orderBy('updated_at', 'desc')
    .limit(limit)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getModuleComplete = async (limit, page, tags) => {
  console.log('limit', limit);
  console.log('page', page);
  console.log('tags', tags);
  let query = firestore.collection('modules');
  for (const tag of tags) {
    console.log(tag);
    query = query.where(`tags.${tag}`, '==', true);
  }
  // query = query.orderBy('num_star', 'desc');
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getModuleRefById = (id) => {
  return firestore.collection('modules').doc(id);
};

export const getModuleById = (id) => {
  console.log(id);
  return firestore
    .collection('modules')
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
        return undefined;
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      return undefined;
    });
};

export const incrementModuleStar = (full_module_id, amount) => {
  return firestore.doc(`modules/${full_module_id}`).update({
    num_star: firebase.firestore.FieldValue.increment(amount),
  });
};

export const uploadImage = (rawImage) => {
  var storageRef = firebase.storage().ref();
  var imgRef = storageRef.child('/users/pictures/resized/mountains.jpg');
  return imgRef.put(rawImage).then(async (snapshot) => {
    console.log('Uploaded a blob or file!');
    const url = await imgRef.getDownloadURL();
    return url;
  });
};

export const addmodule = async (username, module) => {
  console.log(username);
  console.log(module);
  const full_module_id = `${username}\\${module.module_id}`;
  const tags = module.tags;
  const new_module = { ...module, num_star: 0, author: username };
  const batch = firestore.batch();
  const moduleRef = firestore.collection('modules').doc(full_module_id);
  batch.set(moduleRef, new_module);
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const tagRef = firestore.collection('tags').doc(tag);
    const doc = await tagRef.get();
    if (doc.exists) {
      batch.update(tagRef, {
        count: firebase.firestore.FieldValue.increment(1),
      });
    } else {
      batch.set(tagRef, { count: 1, value: tag });
    }
  }
  try {
    return await batch.commit();
  } catch (error) {
    throw error;
  }
};

export const editModule = (username, module) => {
  console.log(firebase.firestore.FieldValue.serverTimestamp());
  console.log(module);
  const full_module_id = `${username}\\${module.module_id}`;
  console.log(full_module_id);
  const new_module = { ...module };
  delete new_module.module_id;
  return firestore.collection('modules').doc(full_module_id).update(new_module);
};

// ========== User Profile Page ===============
export const getUserInfo = async (uid) => {
  try {
    const userRef = firestore.doc('/users/' + uid);
    const snapshot = await userRef.get();
    return snapshot.data();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getModulesByUsername = async (username) => {
  if (username) {
    const moduleRef = firestore
      .collection('/modules')
      .where('author', '==', username);
    const moduleQueries = await moduleRef.get();
    const modules = moduleQueries.docs.map((doc) => doc.data());
    return modules;
  } else {
    return [];
  }
};

export const getStarModules = async (username) => {
  var stars = [];
  if (username) {
    const starRef = firestore
      .collection('stars')
      .where('username', '==', username);
    const starQueries = await starRef.get();
    stars = starQueries.docs.map((star) => star.data().module);
  }

  // console.log(stars); // should get an array of module id
  // find two ways to achieve this
  if (stars.length !== 0) {
    const modules = await firestore
      .collection('/modules')
      .where(firebase.firestore.FieldPath.documentId(), 'in', stars)
      .get();
    return modules.docs.map((doc) => doc.data());
  } else {
    return [];
  }

  // firestore.getAll(documentRef1, documentRef2).then((docs) =>)
};

export const updateAvatar = async (uid, newAvatar) => {
  const userRef = firestore.doc('users/' + uid);
  userRef
    .update('avatar', newAvatar)
    .then(() => {
      return userRef.get();
    })
    .then((doc) => {
      console.log('upload successfully!');
      console.log('New Avatar address: ' + doc.get('avatar'));
    });
};

export const updateUserTheme = (uid, theme) => {
  firestore.doc(`users/${uid}`).update({
    theme,
  });
};

// realtime database
export const realtimeUpdateTheme = (uid, callback) => {
  firestore.doc(`users/${uid}`).onSnapshot((doc) => {
    callback(doc.data().theme);
  });
};

export const realtimeUpdateModule = (full_module_id, callback) => {
  const unsubscribe = firestore
    .collection('modules')
    .doc(full_module_id)
    .onSnapshot((doc) => {
      callback(doc.data());
    });
  return unsubscribe;
};

// =============================================
// Star related
export const starModule = async (username, full_module_id, unstar = false) => {
  const batch = firestore.batch();
  const starRef = firestore
    .collection('stars')
    .doc(constructStarId(username, full_module_id));
  if (unstar) {
    batch.delete(starRef);
  } else {
    batch.set(starRef, { username, module: full_module_id });
  }
  // TODO: add the following to cloud function
  const moduleRef = firestore.doc(`modules/${full_module_id}`);
  batch.update(moduleRef, {
    num_star: firebase.firestore.FieldValue.increment(unstar ? -1 : 1),
  });
  try {
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const userHasStarModule = async (username, full_module_id) => {
  const snapshot = await firestore
    .collection('stars')
    .doc(constructStarId(username, full_module_id))
    .get();
  return snapshot.exists;
};
