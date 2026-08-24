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
            return;
            }

            const data = JSON.parse(rawText);
            console.log("Login exitoso:", data);

        } catch (error) {
            console.error("Error en el proceso de login:", error);
        }
    }


function loginPress(){
try {
        const resultado = await login(inputDni.value, inputPasswd.value);
        console.log("Respuesta del login:", resultado);
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
}
document.getElementById("loginButton").onclick = loginPress;