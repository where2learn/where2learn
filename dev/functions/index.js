const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
const { firestore } = require("firebase-admin");
admin.initializeApp();

// without authentication version
exports.increaseTagCount = functions.https.onRequest((req, res) => {
  const value = req.query.value;
  let documentRef = admin.firestore().doc('tags/' + value);
  documentRef.update(
    'count', firestore.FieldValue.increment(1)
  ).then(() => {
    return documentRef.get(); 
  }).then(doc => {
    res.json({result: `${doc.get('value')} has current count ${doc.get('count')}`});
  })
})