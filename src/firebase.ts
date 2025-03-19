// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkLu9VbDqx0KMo3VrlJg5sLq6fYzSTXtc",
  authDomain: "householdtypescript-87127.firebaseapp.com",
  projectId: "householdtypescript-87127",
  storageBucket: "householdtypescript-87127.firebasestorage.app",
  messagingSenderId: "1051192341609",
  appId: "1:1051192341609:web:2c0364a056fd64299b5ef8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };