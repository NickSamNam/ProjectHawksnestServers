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

// Listen for database changes
attractionsRef.on("child_changed", function(snapshot) {
	console.log("Attraction: " + snapshot.ref.key + "\tOpen: " + snapshot.val().open + "\tWaiting time: " + snapshot.val().waitingTime);
	if (snapshot.val().open) {
	send(snapshot.ref.key, snapshot.val().waitingTime);
	}
});

db.ref("refreshRate").on("value", function(snapshot) {
	refreshRate = snapshot.val();
});

// Send a message to all topics
function send(attraction, waitingTime) {
	// Send a message to devices subscribed to the provided topic.
	var payload = {
		notification: {
			title: attraction.toString(),
			body: waitingTime.toString()
		}
};

var options = {
	priority: "high",
	timeToLive: refreshRate
};
	admin.messaging().sendToTopic(attraction, payload, options)
	.then(function(response) {
    // See the MessagingTopicResponse reference documentation for the
    // contents of response.
    console.log("Successfully sent message:", response);
	})
  .catch(function(error) {
	  console.log("Error sending message:", error);
	  });
}