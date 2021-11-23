const admin = require("firebase-admin");

const serviceAccount = require("./database.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://test-bot-v2-96edd-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const firebase = admin.database();

module.exports = firebase;
