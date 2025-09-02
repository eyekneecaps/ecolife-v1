// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDW5APPZMu-lojVRNg89ZDBEY14YD77xd4",
  authDomain: "ecolife--v1.firebaseapp.com",
  projectId: "ecolife--v1",
  storageBucket: "ecolife--v1.appspot.com",
  messagingSenderId: "655418620895",
  appId: "1:655418620895:web:e5b3ea0cb3b7ec97a26b38",
  databaseURL: "https://ecolife--v1-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const errorDiv = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorDiv.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    errorDiv.textContent = "Please enter both email and password.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } catch (error) {
    const code = error.code;

    if (code === "auth/wrong-password" || code === "auth/user-not-found") {
      errorDiv.textContent = "Incorrect email or password.";
    } else if (code === "auth/too-many-requests") {
      errorDiv.textContent = "Too many attempts. Please try again later.";
    } else {
      errorDiv.textContent = error.message.replace("Firebase:", "").trim();
    }
  }
});
