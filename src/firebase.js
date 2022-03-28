import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCFIAGiR3FMQecdQm0yJt-zPj2tEXGlqlM",
  authDomain: "chat-app-662b8.firebaseapp.com",
  projectId: "chat-app-662b8",
  storageBucket: "chat-app-662b8.appspot.com",
  messagingSenderId: "917853775710",
  appId: "1:917853775710:web:ad0d2758815ee2a480d1cf",
  measurementId: "G-H62MC99H2X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export{auth,db};
