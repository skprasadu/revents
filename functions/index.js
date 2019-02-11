const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const newActivity = (type, event, id) => ({
  type: type,
  eventDate: event.date,
  hostedBy: event.hostedBy,
  title: event.title,
  photoURL: event.hostPhotoURL,
  timestamp: admin.firestore.FieldValue.serverTimestamp(),
  hostUid: event.hostUid,
  eventId: id
});

exports.createActivity = functions.firestore
  .document("events/{eventId}")
  .onCreate(event => {
    let newEvent = event.data();

    console.log(newEvent);

    const activity = newActivity("newEvent", newEvent, event.id);

    console.log(activity);
    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity create with ID", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding Activity", err);
      });
  });

exports.cancelActivity = functions.firestore
  .document("events/{eventId}")
  .onUpdate((event, context) => {
    let updateEvent = event.after.data();
    let previousEventData = event.before.data();

    console.log({ event });
    console.log({ context });
    console.log({ updateEvent });
    console.log({ previousEventData });
    if (
      !updateEvent.cancelled ||
      updateEvent.cancelled === previousEventData.cencelled
    ) {
      return false;
    }

    const activity = newActivity(
      "cancelledEvent",
      updateEvent,
      context.params.eventId
    );

    console.log({ activity });

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity create with ID", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding Activity", err);
      });
  });
