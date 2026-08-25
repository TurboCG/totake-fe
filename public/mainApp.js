document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/mainpage.html";
        return;
    }

    console.log("token:", token);
});

console.log(token)