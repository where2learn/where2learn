const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// get data
// get user data
(async () => {
  const userRef = db.collection("users").doc("huakun");
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("\n\n\nUser Document data:", doc.data());
  }
})();

// get module data
(async () => {
  const modulesRef = db.collection("modules").doc("huakun\\first-module");
  const doc = await modulesRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("\n\n\nModule Document data:", doc.data());
  }
})();

// get tags data
(async () => {
  const tagsRef = db.collection("tags").doc("python");
  const doc = await tagsRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    console.log("\n\n\nTag Document data:", doc.data());
  }
})();

// read all user documents
db.collection("users")
  .get()
  .then((querySnapshot) => {
    const documents = querySnapshot.docs.map((doc) => doc.data());
    console.log(documents);
  });
