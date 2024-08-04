// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "summer-53b00.firebaseapp.com",
  projectId: "summer-53b00",
  storageBucket: "summer-53b00.appspot.com",
  messagingSenderId: "902350058523",
  appId: "1:902350058523:web:f205b377867b37843574be"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
