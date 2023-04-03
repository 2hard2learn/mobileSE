// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-fbQPawM6H7dwBX6DvPdIvlvz56ZYwyI",
  authDomain: "semap-102d2.firebaseapp.com",
  databaseURL: "https://semap-102d2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "semap-102d2",
  storageBucket: "semap-102d2.appspot.com",
  messagingSenderId: "363275410888",
  appId: "1:363275410888:web:d07ae5fa54272aff0a34fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);