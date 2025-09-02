// leaderboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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

const leaderboardList = document.getElementById("leaderboardList");

// Load leaderboard data
const usersRef = ref(db, "users");
onValue(usersRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  const users = Object.values(data)
    .filter(u => u.fullName && u.points != null)
    .sort((a, b) => b.points - a.points);

  leaderboardList.innerHTML = "";

  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${user.fullName} - ${user.points} pts`;
    leaderboardList.appendChild(li);
  });
});

// Show logout only if logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("logOutBtn").style.display = "inline";
  }
});
