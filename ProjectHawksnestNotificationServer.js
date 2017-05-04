/*
---------------------------------------------------------VARIABLES---------------------------------------------------------
*/
// Interval in seconds to send notification.
const refreshRate = 180;
// Seconds into the refreshRate
var seconds = (function(){var date = new Date(); return ((date.getMinutes()*60)+date.getSeconds());});;

// Subscribable topics
var topics = ['python', 'droomvlucht', 'sprookjesbos']

// Payloads corresponding to topics
var payloads = [{
	data: {
		time: "120"
		}
}, {
	data: {
		time: "60"
		}
}, {
	data: {
		time: "30"
		}
}];

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

update();

/*
---------------------------------------------------------FUNCTIONS---------------------------------------------------------
*/

// If it is time sendAll() else update()
function update() {
	if(seconds() % refreshRate == 0) {
		sendAll();
		setTimeout(update, (refreshRate - (seconds()%refreshRate) - 1) * 1000);
	} else if(seconds <= 1) {
		setTimeout(update, 10);
	} else {
		setTimeout(update, (refreshRate - (seconds()%refreshRate) - 1) * 1000);
	}
}

// Send a message to all topics
function sendAll() {
	// Send a message to devices subscribed to the provided topic.
	for(var i = 0; i < topics.length; i++) {
	var topic = topics[i];
	var payload = payloads[i];
	admin.messaging().sendToTopic(topic, payload)
	.then(function(response) {
    // See the MessagingTopicResponse reference documentation for the
    // contents of response.
    console.log("Successfully sent message:", response);
	})
  .catch(function(error) {
	  console.log("Error sending message:", error);
	  });
	}
}