let token;
document.addEventListener("DOMContentLoaded", () => {
    token = localStorage.getItem("token");

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
        const [resColumnas, resProductos] = await Promise.all([
            fetch("https://totake-be.onrender.com/api/v1/getcolumns"),
            fetch("https://totake-be.onrender.com/api/v1/products")
        ])

        const columnas = await resColumnas.json();
        const productos = await resProductos.json();
        console.log(JSON.stringify(columnas, null, 2));
        columnas.forEach(col => {
            col.productos = productos.filter(p => p.sectionid === col.id);
        });

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
            <h1 style="margin-bottom: 5px;">${col.name}</h1>
            <p style="margin-bottom: 15px;">${col.description || ""}</p>
        </div>
    `;

    const scrollContainer = document.createElement("div");
    scrollContainer.className = "scroll-productos";

    (col.productos || []).forEach(producto => {
        scrollContainer.appendChild(crearArticulo(producto));
    });

    columnDiv.appendChild(scrollContainer);

    return columnDiv;
}

function crearArticulo(producto) {
    const article = document.createElement("div");
    article.className = "article";

    article.innerHTML = `
        <img src="${producto.image}" style="padding: 15px; width: 80%; object-fit: cover;" alt="${producto.name}">
        <div style="display: flex; gap: 10px;">
            <div style="width: -webkit-fill-available;">
                <h2 style="margin-bottom: 5px; margin-top: 5px; font-weight: normal;" class="titleArticle">${producto.name}</h2>
                <h2 style="margin-bottom: 0px; margin-top: 5px;" class="priceArticle">$${producto.price}</h2>
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