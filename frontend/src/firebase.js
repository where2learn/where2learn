import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log("enable persistence failed: failed-precondition");
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log("enable persistence failed: unimplemented");
    }
  });

export const provider = new firebase.auth.GoogleAuthProvider();

export const auth = app.auth();

export const firestore = firebase.firestore();
export default app;

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
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
    console.error("Error fetching user", error);
  }
};

// Module Related
export const getModules = async () => {
  const snapshot = await firebase
    .firestore()
    .collection("modules")
    .orderBy("num_star", "desc")
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const uploadImage = (rawImage) => {
  var storageRef = firebase.storage().ref();
  var imgRef = storageRef.child("/users/pictures/resized/mountains.jpg");
  return imgRef.put(rawImage).then(async (snapshot) => {
    console.log("Uploaded a blob or file!");
    const url = await imgRef.getDownloadURL();
    return url;
  });
};

// ========== User Profile Page ===============
export const getUserInfo = async (uid) => {
  const userRef = firestore.doc("/users/" + uid);
  const snapshot = await userRef.get();

  return snapshot.data();
};

export const getModulesByUsername = async (username) => {
  const moduleRef = firestore
    .collection("/modules")
    .where("author", "==", username);
  const moduleQueries = await moduleRef.get();
  const modules = moduleQueries.docs.map((doc) => doc.data());
  // const starRef = firestore
  //   .collection("/stars")
  //   .where("username", "==", "username");
  // const starQueries = await starRef.get();
  // const stars = starQueries.docs.map((star) => star.data());

  // const starts =

  return modules;
};

export const getStarModules = async (username) => {
  const starRef = firestore
    .collection("stars")
    .where("username", "==", username);
  const starQueries = await starRef.get();
  const stars = starQueries.docs.map((star) => star.data().module);
  console.log(stars); // should get an array of module id
  // find two ways to achieve this
  const modules = await firestore
    .collection("/modules")
    .where(firebase.firestore.FieldPath.documentId(), "in", stars)
    .get();
  return modules.docs.map((doc) => doc.data());

  // firestore.getAll(documentRef1, documentRef2).then((docs) =>)
};

export const updateAvatar = async (uid, newAvatar) => {
  const userRef = firestore.doc("users/" + uid);
  userRef
    .update("avatar", newAvatar)
    .then(() => {
      return userRef.get();
    })
    .then((doc) => {
      console.log("upload successfully!");
      console.log("New Avatar address: " + doc.get("avatar"));
    });
};

export const realtimeUpdateTheme = async (uid, callback) => {
  firestore.doc(`users/${uid}`).onSnapshot((doc) => {
    callback(doc.data().theme);
  });
};

// =============================================
