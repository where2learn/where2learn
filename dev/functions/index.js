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

exports.increaseTagCount = functions.https.onCall((data, context) => {
  // context containing 
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.');
  }
  const value = data.value;
  // Authentication / user information is automatically added to the request.
  // const uid = context.auth.uid;
  const name = context.auth.token.name || null;

  let documentRef = admin.firestore().doc('tags/' + value);
  return documentRef.update(
    'count', firestore.FieldValue.increment(1)
  ).then(() => {
    return documentRef.get(); 
  }).then(doc => {
    return {text: `Hi ${name}, ${doc.get('value')} has current count ${doc.get('count')}`}
  })
})
