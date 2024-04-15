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
                  /*showAlert("Welcome back, admin " + username, "blue")*/
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

// Function to show alert
/*function showAlert(message, color) {
  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.style.backgroundColor = color;
  alertDiv.style.color = "white";
  alertDiv.style.padding = "10px";
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "10%";
  alertDiv.style.left = "50%";
  alertDiv.style.transform = "translate(-50%, -50%)";
  alertDiv.style.zIndex = "1000";
  document.body.appendChild(alertDiv);
  setTimeout(() => {
      document.body.removeChild(alertDiv);
  }, 800);
}
*/



document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform form validation
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    localStorage.setItem('username', username);
    //localStorage.setItem('name', name);
  
    // Redirect to main page (replace 'main.html' with your actual main page URL)
    window.location.href = 'main.html';
  });

  
  