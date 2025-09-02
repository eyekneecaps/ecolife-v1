// Auto Theme Detection
document.addEventListener('DOMContentLoaded', () => {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = getCookie("theme");
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  // Adjust navigation bar color
  const topnav = document.querySelector('.topnav');
  if (theme === "dark") {
    topnav.style.backgroundColor = "#0a0f1a";
  } else {
    topnav.style.backgroundColor = "#f0f0f0";
  }

  // Show/Hide logout button
  const authBtn = document.getElementById("authButton");
  const logoutBtn = document.querySelector(".logout-btn");
  const isLoggedIn = getCookie("loggedIn") === "true";

  if (authBtn) authBtn.style.display = isLoggedIn ? "none" : "inline";
  if (logoutBtn) logoutBtn.style.display = isLoggedIn ? "inline" : "none";
});

// Theme Toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  setCookie("theme", newTheme, 365);
  window.location.reload(); // to apply topnav color
}

// Gear Dropdown Toggle
function toggleSettings() {
  document.getElementById("settingsDropdown").classList.toggle("show");
}

// Log Out
function logout() {
  eraseCookie("loggedIn");
  window.location.href = "login.html";
}

// Dashboard Protection
document.addEventListener("DOMContentLoaded", () => {
  const dashboardLink = document.getElementById("dashboardLink");
  if (dashboardLink) {
    dashboardLink.addEventListener("click", (e) => {
      if (getCookie("loggedIn") !== "true") {
        e.preventDefault();
        const popup = document.getElementById("loginRequiredPopup");
        if (popup) popup.style.display = "flex";
        setTimeout(() => popup.style.display = "none", 3000);
      }
    });
  }
});

// --- Cookie Helpers ---
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}
function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '');
}
function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/';
}
