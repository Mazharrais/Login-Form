

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

import { getAuth, signOut, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

import {  getFirestore, collection, addDoc, getDocs, doc, deleteDoc  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js"


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
const db = getFirestore(app);


let userEmail;
let docId;

const updateProfile = async () => {
  console.log("update Profile call...");
  console.log(docId);

  if(docId){

    await deleteDoc(doc(db, "students", docId));
     console.log("Deleted :", docId);
  }


}



function validateUser() {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
      if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          if (!user.emailVerified) {
              window.alert("Kindly verify your email in order to proceed");
              sendEmailVerification(auth.currentUser)
                  .then(() => {
                      // Email verification sent!
                      window.location = "index.html";
                      // ...
                  })
                  .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.log(errorMessage);
                  });
          }
          else {
              userEmail = user.email;
              const querySnapshot = await getDocs(collection(db, "students"));
              querySnapshot.forEach((doc) => {
              // console.log(`${doc.id} => ${doc.data()}`);
              if(doc.data().email == userEmail){

                docId = doc.id;
                document.getElementById("fname").value = doc.data().first;
                 document.getElementById("mname").value = doc.data().middle;
                 document.getElementById("lname").value = doc.data().last;
                 document.getElementById("profileBtn").value = "update profile";
                 document.getElementById("profileBtn").addEventListener("click",updateProfile);
              }
           });
          }
          // ...
      } else {
          // User is signed out
          window.location = "index.html";
          // ...
      }
  });
}
validateUser();

function logOut() {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("signOut successfully");
    window.location = "index.html";
  }).catch((error) => {

    console.log("error", error);
  });
}

document.getElementById("signOutBtn").addEventListener("click", logOut);



const createProfile =  async () =>{
  
  // console.log(userEmail);
  try {
      const docRef = await addDoc(collection(db, "students"), {
           first: document.getElementById("fname").value,
          middle: document.getElementById("mname").value,
           last: document.getElementById("lname").value,
           email : userEmail
      });
      //  console.log(userEmail);
      console.log("Document written with ID: ", docRef.id);
     docId = docRef.id;
  } 
  catch (e) {
      console.error("Error adding document: ", e.errorMessage);
  }
  
}


document.getElementById("profileBtn").addEventListener("click", createProfile);
