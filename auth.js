// Check login
const user = localStorage.getItem('user');
const logoutTop = document.getElementById('logoutTop');
const loginPopup = document.getElementById('login-popup');

if (!user) {
  if (window.location.pathname.includes('dashboard.html')) {
    loginPopup.style.display = 'block';
    setTimeout(() => {
      loginPopup.style.display = 'none';
    }, 4000);
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 4200);
  }
} else {
  logoutTop.style.display = 'block';
}

// Toggle Settings Menu
function toggleSettings() {
  document.getElementById("settingsDropdown").classList.toggle("show");
}

// Logout Function
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Theme Mode
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

// Set theme from localStorage or system
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
}
