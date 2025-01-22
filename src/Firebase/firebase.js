import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhL8XYt756Q3XdZ_xJfWmq_qa9bP7Oy_g",
  authDomain: "nft-tracker-975ba.firebaseapp.com",
  projectId: "nft-tracker-975ba",
  storageBucket: "nft-tracker-975ba.appspot.com", 
  messagingSenderId: "1055372345422",
  appId: "1:1055372345422:web:fdb305a7ce9fe0cd66431f",
  measurementId: "G-Y91LE9H4Q2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };
