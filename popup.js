function goToDashboard() {
  const isLoggedIn = document.cookie.includes("loggedIn=true");
  if (!isLoggedIn) {
    const popup = document.getElementById("loginPopup");
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 2500);
  } else {
    window.location.href = "dashboard.html";
  }
}
    