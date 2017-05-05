// Initialisation
var admin = require("firebase-admin");
var serviceAccount = require("./project-hawksnest-firebase-adminsdk-ff34s-2ea5bd7319.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-hawksnest.firebaseio.com/",
  databaseAuthVariableOverride: {
	  uid: "databaseUpdateServer"
  }
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
		console.log("Updating values");
		attractionsRef.update(updateVals());
		setTimeout(update, (refreshRate - (seconds()%refreshRate) - 1) * 1000);
	} else if(seconds <= 1) {
		setTimeout(update, 10);
	} else {
		setTimeout(update, (refreshRate - (seconds()%refreshRate) - 1) * 1000);
	}
}

function updateVals() {
	return {
			"python/waitingTime" : Math.round(120*Math.random())
	};
}