/*import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSxRu-IM4_ZohFwLytie6qCQlFiqfpXMY",
    authDomain: "inventory-management-e7294.firebaseapp.com",
    databaseURL: "https://inventory-management-e7294-default-rtdb.firebaseio.com",
    projectId: "inventory-management-e7294",
    storageBucket: "inventory-management-e7294.appspot.com",
    messagingSenderId: "627874425743",
    appId: "1:627874425743:web:f8090407c664bb9e75f9fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Sign up form
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate password
    if (!isValidPassword(password)) {
        alert("Password must be 8 characters long, contain at least one number, and one symbol.");
        return;
    }

    // Check if the user is already signed in
    auth.onAuthStateChanged(user => {
      if (user) {
          // User is signed in
          // Handle login functionality
          signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log("User logged in:", user);
                  
                  alert(`Admin ${username} !  Welcome Back :) `);
                  // Redirect to main page (replace 'main.html' with your actual main page URL)
                  window.location.href = 'main.html';
                  //showAlert("Welcome back, admin " + username, "blue")
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error("Error logging in:", errorMessage);
                  alert("Error logging in. Please try again.");
              });
      } else {
          // User is not signed in
          // Sign up user with email and password
          createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log("User signed up:", user);

                  // Save user details to Firebase Database
                  push(ref(database, "admins"), {
                      username: username,
                      email: email,
                      uid: user.uid
                  });

                  // Display welcome message
                  alert(`Admin ${username} signed up! Welcome`);

                  // Redirect to main page (replace 'main.html' with your actual main page URL)
                  window.location.href = 'main.html';
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error("Error signing up:", errorMessage);
                  alert("Error signing up. Please try again.");
              });
      }
  });
});

// Function to validate password
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSxRu-IM4_ZohFwLytie6qCQlFiqfpXMY",
    authDomain: "inventory-management-e7294.firebaseapp.com",
    databaseURL: "https://inventory-management-e7294-default-rtdb.firebaseio.com",
    projectId: "inventory-management-e7294",
    storageBucket: "inventory-management-e7294.appspot.com",
    messagingSenderId: "627874425743",
    appId: "1:627874425743:web:f8090407c664bb9e75f9fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const allowedAdminEmails = ["meganealexis12@gmail.com", "meganealexis13@gmail.com", "ndresv@hotmail.com", "Brettspringer7@gmail.com", "laurenlibat@gmail.com"];
const meganeEmail = "meganealexis14@gmail.com";

// Sign up form
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the email is one of the allowed admin emails
    if (!allowedAdminEmails.includes(email)) {
        alert(`You do not have access. Contact Megane Alexis (${meganeEmail}) for access.`);
        return;
    }

    // Validate password
    if (!isValidPassword(password)) {
        alert("Password must be 8 characters long, contain at least one number, and one symbol.");
        return;
    }

    // Check if the user is already signed in
    auth.onAuthStateChanged(user => {
      if (user) {
          // User is signed in
          // Handle login functionality
          signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log("User logged in:", user);
                  
                  alert(`Admin ${username} !  Welcome Back :) `);
                  // Redirect to main page (replace 'main.html' with your actual main page URL)
                  window.location.href = 'main.html';
                  //showAlert("Welcome back, admin " + username, "blue")
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error("Error logging in:", errorMessage);
                  alert("Error logging in. Please try again.");
              });
      } else {
          // User is not signed in
          // Sign up user with email and password
          createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log("User signed up:", user);

                  // Save user details to Firebase Database
                  push(ref(database, "admins"), {
                      username: username,
                      email: email,
                      uid: user.uid
                  });

                  // Display welcome message
                  alert(`Admin ${username} signed up! Welcome`);

                  // Redirect to main page (replace 'main.html' with your actual main page URL)
                  window.location.href = 'main.html';
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error("Error signing up:", errorMessage);
                  alert("Error signing up. Please try again.");
              });
      }
  });
});

// Function to validate password
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}
/*

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSxRu-IM4_ZohFwLytie6qCQlFiqfpXMY",
    authDomain: "inventory-management-e7294.firebaseapp.com",
    databaseURL: "https://inventory-management-e7294-default-rtdb.firebaseio.com",
    projectId: "inventory-management-e7294",
    storageBucket: "inventory-management-e7294.appspot.com",
    messagingSenderId: "627874425743",
    appId: "1:627874425743:web:f8090407c664bb9e75f9fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const allowedAdminEmails = ["meganealexis12@gmail.com", "meganealexis13@gmail.com", "ndresv@hotmail.com", "Brettspringer7@gmail.com", "laurenlibat@gmail.com"];
const meganeEmail = "meganealexis14@gmail.com";

// Sign up form
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the email is one of the allowed admin emails
    if (!allowedAdminEmails.includes(email)) {
        alert(`You do not have access. Contact Megane Alexis (${meganeEmail}) for access.`);
        return;
    }

    // Validate password
    if (!isValidPassword(password)) {
        alert("Password must be 8 characters long, contain at least one number, and one symbol.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user details to Firebase Database
        await push(ref(database, "admins"), {
            username: username,
            email: email,
            uid: user.uid
        });

        // Display welcome message
        alert(`Admin ${username} signed up! Welcome`);

        // Redirect to main page (replace 'main.html' with your actual main page URL)
        window.location.href = 'main.html';
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorMessage);
        alert("Error signing up. Please try again.");
    }
});

// Function to validate password
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}
*/


