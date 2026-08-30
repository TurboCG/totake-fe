document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/mainpage.html";
        return;
    }

    console.log("token:", token);
});
async function cargarColumnas() {
    const loadingIndicator = document.querySelector(".loadingIndicator");
    const contenedor = document.getElementById("content");

    try {
        const res = await fetch("https://totake-be.onrender.com/api/v1/getcolumns");
        const columnas = await res.json();

        contenedor.innerHTML = ""; 
        columnas.forEach(col => {
            contenedor.appendChild(crearColumna(col));
        });

    } catch (error) {
        console.error(error);
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = "none";
    }
}

function crearColumna(col) {
    const columnDiv = document.createElement("div");
    columnDiv.className = "columnH";

    columnDiv.innerHTML = `
        <div>
            <h1 style="margin-bottom: 5px;">${col.nombre}</h1>
            <p style="margin-bottom: 15px;">${col.subtitulo || ""}</p>
        </div>
    `;

    col.productos.forEach(producto => {
        columnDiv.appendChild(crearArticulo(producto));
    });

    return columnDiv;
}

function crearArticulo(producto) {
    const article = document.createElement("div");
    article.className = "article";

    article.innerHTML = `
        <img src="${producto.imagen_url}" style="padding: 15px; width: 80%;" alt="${producto.nombre}">
        <div style="display: flex; gap: 10px;">
            <div style="width: -webkit-fill-available;">
                <h2 style="margin-bottom: 5px; margin-top: 5px; font-weight: normal;" class="titleArticle">${producto.nombre}</h2>
                <h2 style="margin-bottom: 0px; margin-top: 5px;" class="priceArticle">$${producto.precio}</h2>
            </div>
            <img src="./res/buy.svg" style="align-self: end;" alt="Comprar">
        </div>
    `;

    article.addEventListener("click", () => {
        console.log("click:", producto.id);
    });

    return article;
}

document.addEventListener("DOMContentLoaded", cargarColumnas);
console.log(token)