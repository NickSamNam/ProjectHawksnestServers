/*
---------------------------------------------------------MAIN---------------------------------------------------------
*/
// Initialisation
var admin = require("firebase-admin");
var serviceAccount = require("./test-e8411-firebase-adminsdk-ddkq9-49bd03de98.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-e8411.firebaseio.com/"
});

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});