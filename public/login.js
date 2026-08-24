async function login(dni, passwd) {
    try{
    const res = await fetch("https://totake-be.onrender.com/api/v1/login", {
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
    var inputDni = document.getElementById("labelDni");
    var inputPasswd = document.getElementById("labelPasswd");
    login(inputDni.value, inputPasswd.value);
}
document.getElementById("loginButton").onclick = loginPress;