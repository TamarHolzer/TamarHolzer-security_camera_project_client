// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUx2X5aZ5ZWY28Ja9fD8S8KJ2ccwbMSps",
  authDomain: "security-camera-project-14bd8.firebaseapp.com",
  projectId: "security-camera-project-14bd8",
  storageBucket: "security-camera-project-14bd8.appspot.com",
  messagingSenderId: "678601442014",
  appId: "1:678601442014:web:e666af81d2a323c315384f",
  measurementId: "G-F39ZQS0G7P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
