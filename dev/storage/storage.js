const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const storage = admin.storage();

// rawImage param is the binary data read from the file system or downloaded from URL
function uploadImageToStorage(rawImage){
  const bucket = storage.bucket("where2learn-dev.appspot.com");
  const file = bucket.file("test.jpeg");

  file.save(
    rawImage,
    {
      // set the content type to ensure the extension triggers the image resize(s)
      metadata: { contentType: "image/jpeg" },
    },
    (error) => {
      if (error) {
        throw error;
      }
      console.log("Sucessfully uploaded image");
    }
  );
}

exports.upload = functions.https.onRequest((req, res) => {
    
})
