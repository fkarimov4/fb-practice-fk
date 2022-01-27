// import our restaurants
const restaurants = require('./restaurants.json');

// import a set of tolls to talk to Firebase and Firestore
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// import our credentials
const credentials = require('./credentials.json')

// connect to Firebase Services
initializeApp({
    credential: cert(credentials)
});

// connect to Firestore
const db = getFirestore();

// create a collection called "restaurants"

// add each restaurant
db.collection('restaurants').add(restaurants[0])
    .then(doc => {
        console.log('Added restaurant', doc.id)
    })
    .catch(err => {
        console.error(err)
    });