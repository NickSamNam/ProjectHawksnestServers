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
var refreshRate;
var seconds = (function(){var date = new Date(); return ((date.getMinutes()*60)+date.getSeconds());});;

attractionsRef.once("value", function(snapshot) {
  console.log(snapshot.val());
});

db.ref("refreshRate").on("value", function(snapshot) {
	refreshRate = snapshot.val();
});

update();

function update() {
	if(seconds() % refreshRate == 0) {
		attractionsRef.update({
			"python/waitingTime" : 120*Math.random()
});
		setTimeout(update, (refreshRate - (seconds()%refreshRate) - 1) * 1000);
	} else if(seconds <= 1) {
		setTimeout(update, 10);
	} else {
		setTimeout(update, (refreshRate - (seconds()%refreshRate) - 1) * 1000);
	}
}