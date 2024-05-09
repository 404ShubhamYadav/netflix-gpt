// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChoC4jpaLTCSs6srb7vPfm0igflzUmhmk",
  authDomain: "netflix-gpt-d558a.firebaseapp.com",
  projectId: "netflix-gpt-d558a",
  storageBucket: "netflix-gpt-d558a.appspot.com",
  messagingSenderId: "645664806655",
  appId: "1:645664806655:web:9fa681c83896c9a48f1eca",
  measurementId: "G-6VF0ZNZ138"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();