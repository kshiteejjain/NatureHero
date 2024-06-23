// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjhyX8_KgGKWalkYQTYZtyfB2_oZzOzKI",
  authDomain: "naturesuperhero-f2d56.firebaseapp.com",
  projectId: "naturesuperhero-f2d56",
  storageBucket: "naturesuperhero-f2d56.appspot.com",
  messagingSenderId: "951738389393",
  appId: "1:951738389393:web:35fb5d3c1722932808c030",
  measurementId: "G-7R1P4B6211"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
export { analytics, firestore };    