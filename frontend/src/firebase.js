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
