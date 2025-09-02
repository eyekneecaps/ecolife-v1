// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const db = getDatabase(app);

// Elements
const signupForm = document.getElementById("signupForm");
const fullNameInput = document.getElementById("signupFullName");
const emailInput = document.getElementById("signupEmail");
const passwordInput = document.getElementById("signupPassword");
const confirmPasswordInput = document.getElementById("signupConfirmPassword");
const errorDiv = document.getElementById("signupError");

// Password rules elements
const ruleLength = document.getElementById("ruleLength");
const ruleUppercase = document.getElementById("ruleUppercase");
const ruleNumber = document.getElementById("ruleNumber");
const ruleSpecial = document.getElementById("ruleSpecial");

// Real-time password validation
passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;
  ruleLength.textContent = pwd.length >= 8 ? "✅ Minimum 8 characters" : "❌ Minimum 8 characters";
  ruleUppercase.textContent = /[A-Z]/.test(pwd) ? "✅ At least 1 uppercase letter" : "❌ At least 1 uppercase letter";
  ruleNumber.textContent = /[0-9]/.test(pwd) ? "✅ At least 1 number" : "❌ At least 1 number";
  ruleSpecial.textContent = /[!@#$%^&*]/.test(pwd) ? "✅ At least 1 special character" : "❌ At least 1 special character";
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = fullNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  errorDiv.textContent = "";

  if (!fullName || !email || !password || !confirmPassword) {
    errorDiv.textContent = "All fields are required.";
    return;
  }

  if (password !== confirmPassword) {
    errorDiv.textContent = "Passwords do not match.";
    return;
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    errorDiv.textContent = "Password does not meet all requirements.";
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    await set(ref(db, `users/${uid}`), {
      fullName,
      email,
      points: 0,
      rfid: null
    });

    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } catch (err) {
    errorDiv.textContent = err.message.replace("Firebase:", "").trim();
  }
});
