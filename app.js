

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA3gZpeHco4bbSghQGaAsjE4Z9Hp_dOa4k",
  authDomain: "classtask-adb74.firebaseapp.com",
  projectId: "classtask-adb74",
  storageBucket: "classtask-adb74.appspot.com",
  messagingSenderId: "623463273146",
  appId: "1:623463273146:web:76234a2c3f0efc457c2883"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



function signUp(){

   var email = document.getElementById('email').value;
   var password = document.getElementById('pass').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        // ...
        console.log("your user is found");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage );
      });





}

document.getElementById('signUpBtn').addEventListener("click",signUp)


function signIn(){


    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;


    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user====>", user);
        
        // ...
        window.location = "dashboard.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });


}

document.getElementById('signInBtn').addEventListener("click",signIn)






  
 




