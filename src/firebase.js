// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXtvJlZEzA8ef87Nu8sC2bI4Pg_OzBrXk",
  authDomain: "personal-finance-a2e4e.firebaseapp.com",
  projectId: "personal-finance-a2e4e",
  storageBucket: "personal-finance-a2e4e.appspot.com",
  messagingSenderId: "83031796867",
  appId: "1:83031796867:web:7a54fa95db5b0fcc6effb6",
  measurementId: "G-8F7EL1EX8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};