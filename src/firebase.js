// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAIxx-pbZJFyUoDsOCwvlK2RHGSP-4rHkE",
  authDomain: "netflix-clone-c.firebaseapp.com",
  projectId: "netflix-clone-c",
  storageBucket: "netflix-clone-c.appspot.com",
  messagingSenderId: "1009542284452",
  appId: "1:1009542284452:web:00623a36e5fb21c3e71231",
  measurementId: "G-PVH2BP5FES"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth };
export default db;