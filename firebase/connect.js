import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_iOClc5qtuuSjx-ifPIWB4K5bWh1xnG8",
    authDomain: "projectse-f0754.firebaseapp.com",
    projectId: "projectse-f0754",
    storageBucket: "projectse-f0754.appspot.com",
    messagingSenderId: "78191746440",
    appId: "1:78191746440:web:4d7cec9b29625daefdee3d",
    measurementId: "G-FXP7XVJHQS"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp

