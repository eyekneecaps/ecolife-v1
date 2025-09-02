// settings.js
document.addEventListener("DOMContentLoaded", () => {
  const gear = document.getElementById("gearIcon");
  const dropdown = document.getElementById("settingsDropdown");

  if (gear) {
    gear.addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });
  }

  // Close dropdown on outside click
  window.addEventListener("click", (e) => {
    if (!gear.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      document.cookie = `theme=${next}; path=/; max-age=31536000`;
    });

    // Load saved theme from cookies
    const themeCookie = document.cookie.split('; ').find(row => row.startsWith('theme='));
    if (themeCookie) {
      document.documentElement.setAttribute("data-theme", themeCookie.split('=')[1]);
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
    }
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      location.href = "login.html";
    });
  }

  // Show/hide login/signup vs logout
  const loggedIn = document.cookie.includes("loggedIn=true");
  document.querySelectorAll(".auth-link").forEach(link => {
    link.style.display = loggedIn ? "none" : "inline-block";
  });
  const logoutVisible = document.getElementById("logoutBtn");
  if (logoutVisible) logoutVisible.style.display = loggedIn ? "block" : "none";
});
