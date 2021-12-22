// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0RE_dVnC_sDrcd4r8F5giuV4gtrlD1Ug",
  authDomain: "birthday-75ff2.firebaseapp.com",
  databaseURL: "https://birthday-75ff2-default-rtdb.firebaseio.com",
  projectId: "birthday-75ff2",
  storageBucket: "birthday-75ff2.appspot.com",
  messagingSenderId: "501307912884",
  appId: "1:501307912884:web:e73f89c309e712a1769de1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("onAuthStateChanged success");
    console.log(uid);
  } else {
    console.log("onAuthStateChanged failed");
  }
});
