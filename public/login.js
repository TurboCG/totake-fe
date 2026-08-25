async function login(dni, passwd) {
    try{
    const response = await fetch("https://totake-be.onrender.com/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dni: dni,
            passwd: passwd
            /* porque pinto */
        })
        });
        const rawText = await response.text();

            if (!response.ok) {
            console.error(`Error HTTP ${response.status}:`, rawText);
            document.getElementById("spinnerLogin").style.display = "none";
            document.getElementById("labelLogin").style.display = "flex";
            return;
            }

            const data = JSON.parse(rawText);
            console.log("Login exitoso:", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            window.location.href = "mainApp.html";
        } catch (error) {
            console.error("Error en el proceso de login:", error);
        }
    }


async function loginPress(){
    document.getElementById("spinnerLogin").style.display = "flex";
    document.getElementById("labelLogin").style.display = "none";
    const inputDni = document.getElementById("labelDni");
    const inputPasswd = document.getElementById("labelPasswd");
    if (!inputDni || !inputPasswd) {
        console.error("No se encontraron los elementos en el DOM.");
        return;
    }
    try {
            const resultado = await login(inputDni.value, inputPasswd.value);
            console.log("Respuesta del login:", resultado);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }
document.getElementById("loginButton").onclick = loginPress;
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        window.location.href = "/mainApp.html";
        return;
    }
    console.log("token:", token);
});

console.log(token)