import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAUcYE1-k0RQ-xtkEnWKHzgGpOOawwiwmg",
  authDomain: "fortune-cookie-26c0f.firebaseapp.com",
  projectId: "fortune-cookie-26c0f",
  storageBucket: "fortune-cookie-26c0f.appspot.com",
  messagingSenderId: "962309485012",
  appId: "1:962309485012:web:f72aa5a5d7c7b4392fa641",
  measurementId: "G-WME8GXR5XN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
