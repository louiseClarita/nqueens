import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2tIT2EeS5o7ks8N7irtm9oSA3NXbDQ58",
  authDomain: "nqueens-6f576.firebaseapp.com",
  projectId: "nqueens-6f576",
  storageBucket: "nqueens-6f576.appspot.com",
  messagingSenderId: "828680726403",
  appId: "1:828680726403:web:2d001090dce4b5fa30b8b6",
  measurementId: "G-J2YZ93WXZB"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


if (firebase?.apps.Length === 0){
  const app = firebase.initializeApp(firebaseConfig);
  }else {
  //app = firebase.app();
  }
  const db = firebase.firestore(app)
  
  const auth = firebase.auth()
  export { auth ,app , db }