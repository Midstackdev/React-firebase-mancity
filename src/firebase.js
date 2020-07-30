import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://mancity-e65b5.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const firebaseDB = firebase.database()
const firebaseMatches = firebaseDB.ref('matches')
const firebasePromotions = firebaseDB.ref('promotions')
const firebaseTeams = firebaseDB.ref('teams')
const firebasePlayers = firebaseDB.ref('players')

// firebaseDB.ref('matches').once('value').then((snapshot) => console.log(snapshot.val()))

export {
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers
}