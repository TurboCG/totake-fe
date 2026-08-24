async function login(dni, passwd) {
    const res = await fetch("https://totake-be.onrender.com/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dni: dni,
            passwd: passwd
            /* porque pinto */
        })
        });
        const data = await res.json();
        if (res.ok) {
            console.log("Token:", data.token);
            localStorage.setItem("token", data.token); // guardalo para requests futuros
        } else {
            console.error(data.error);
        }
    }


function loginPress(){
    var inputDni = document.getElementById("labelDni");
    var inputPasswd = document.getElementById("labelPasswd");
    login(inputDni, inputPasswd);
}
document.getElementById("loginButton").onclick = loginPress;