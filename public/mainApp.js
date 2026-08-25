document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/mainApp.html";
        return;
    }

    console.log("token:", token);
});