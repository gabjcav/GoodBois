import firebase from "firebase";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

try {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
} catch (error) {
  // /REGEX/
  if (!/already exists/.test(error.message)) {
    console.error("Firebase error");
  }
}
export const firebaseInstance = firebase;

const queryFirebase = (collection) => {
  return firebaseInstance.firestore().collection(collection).get();
};

export default queryFirebase;
