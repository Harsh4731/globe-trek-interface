import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs3BZr2ljjUNxdGdTNj4o65YDTOmeqNJY",
  authDomain: "travelease-3b149.firebaseapp.com",
  projectId: "travelease-3b149",
  storageBucket: "travelease-3b149.firebasestorage.app",
  messagingSenderId: "539203867152",
  appId: "1:539203867152:web:c12ba92dd650fa84a7b095",
  measurementId: "G-KJRH48SE0D"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);