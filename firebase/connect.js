import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGzkpqvEM1WHYsegv5kE3I-fYfwm6K3sY",
  authDomain: "se2-project-8a779.firebaseapp.com",
  projectId: "se2-project-8a779",
  storageBucket: "se2-project-8a779.appspot.com",
  messagingSenderId: "941499991557",
  appId: "1:941499991557:web:dcb0c62ee06813eef87e6c",
  measurementId: "G-YJB10S50TC"
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp

