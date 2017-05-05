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
var attractionsRef = db.ref("attractions");
attractionsRef.once("value", function(snapshot) {
  console.log(snapshot.val());
});

attractionsRef.update({
	"droomvlucht/open" : "true",
	"droomvlucht/waitingTime" : "15",
	"sprookjesbos/waitingTime" : "15"
});