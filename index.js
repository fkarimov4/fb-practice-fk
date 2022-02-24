// import our restaurants
const restaurants = require("./restaurants.json");

// import a set of tools to talk to Firebase and Firestore
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// import our credentials
const credentials = require("./credentials.json");
const { read } = require("fs");

// connect to Firebase Services
initializeApp({ credential: cert(credentials) });

// connect to Firestore
const db = getFirestore();

// create a collection called "restaurants"
const restRef = db.collection("restaurants");

// add each restaurant
restRef.add(restaurants[3])
  .then((doc) => {
    console.log("Added restaurant", doc.id);
  })
  .catch((err) => {
    console.error(err);
  });

// read one document
restRef.doc('LJSTDbFxWwP1EYq2XRjp').get()
    .then(doc => {
        console.log(doc.id, '=>', doc.data())
    })
    .catch(err => console.error(err));

// get all documents
restRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data())
        })
    })
    .catch(console.error)

//querying find a document(s)
restRef
  .where("name", "==", "Bolay")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  })
  .catch(console.error);
