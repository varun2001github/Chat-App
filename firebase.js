// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFIAGiR3FMQecdQm0yJt-zPj2tEXGlqlM",
  authDomain: "chat-app-662b8.firebaseapp.com",
  projectId: "chat-app-662b8",
  storageBucket: "chat-app-662b8.appspot.com",
  messagingSenderId: "917853775710",
  appId:"1:917853775710:web:ad0d2758815ee2a480d1cf",
  measurementId: "G-H62MC99H2X"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore();
const auth=getAuth();
export{ auth , db };
