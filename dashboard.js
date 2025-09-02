// dashboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const nameDisplay = document.getElementById("userName");
const rfidInput = document.getElementById("rfidInput");
const rfidBtn = document.getElementById("linkRFIDBtn");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const snapshot = await get(ref(db, `users/${uid}`));

    if (snapshot.exists()) {
      const data = snapshot.val();
      nameDisplay.textContent = `Welcome, ${data.fullName || "User"}!`;

      if (data.rfid) {
        document.getElementById("rfidStatus").textContent = `RFID linked: ${data.rfid}`;
      }
    }
  } else {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  }
});

// Link RFID button
rfidBtn.addEventListener("click", async () => {
  const uid = auth.currentUser?.uid;
  const newRFID = rfidInput.value.trim();

  if (uid && newRFID) {
    await set(ref(db, `users/${uid}/rfid`), newRFID);
    document.getElementById("rfidStatus").textContent = `RFID linked: ${newRFID}`;
    rfidInput.value = "";
  }
});

// Logout
logoutBtn?.addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
});

// Theme toggle
const themeToggleBtn = document.getElementById("toggleTheme");
themeToggleBtn?.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// On load: apply theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", systemTheme);
}
