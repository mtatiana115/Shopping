const contenedorProducto = document.querySelector("#lista-productos");
const tbody = document.querySelector("tbody");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const dark = document.querySelector("#mode");
const body = document.querySelector("body");


const btnDark = document.createElement("button");
btnDark.textContent = "Dark mode"
dark.appendChild(btnDark);

let estiloActual = "lightMode"; 

btnDark.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar la configuración predeterminada

    if (estiloActual === "lightMode") {
        body.classList.toggle("lightMode");
        body.classList.toggle("darkMode");
        estiloActual = "darkMode";
        const encabezado = document.getElementById('encabezado');
        encabezado.classList.replace('encabezado', 'darkColor');
    } else {
        body.classList.toggle("darkMode");
        body.classList.toggle("lightMode");
        estiloActual = "lightMode";
        const encabezado = document.getElementById('encabezado');
        encabezado.classList.replace('darkColor', 'encabezado');
    }
    //otra forma
    //document.body.classList.toggle("darkMode");
    if (document.body.classList.contains("darkMode")){
        localStorage.setItem("mode", "darkMode")
        return
    }
});


//evento para recargar la pagina, evemto para escuchar cada vez que la pagina se recarga
document.addEventListener("DOMContentLoaded", function (){
   
    const carritoComprasString = localStorage.getItem("carritoCompras");

    if (carritoComprasString){
        let carritoComprasJs = JSON.parse(carritoComprasString);  
        listaCarrito = carritoComprasJs;
        pintarProductos();
    }
    //logica del modo
    const modo = localStorage.getItem("mode");

    if (modo == "darkMode") {
        document.body.classList.add ("darkMode")
    } else  {
        document.body.classList.remove("darkMode");
    }
    
});

let listaCarrito = [];

btnVaciarCarrito.addEventListener("click", (e) => {
    e.preventDefault(); //quitar la configuracion predeterminada
    listaCarrito = [];
    limpiarCarrito();
    localStorage.removeItem("carritoCompras");
});

contenedorProducto.addEventListener("click", function (e) {
    e.preventDefault();

    //SI la etiqueta que se le dio clic contiene la clase agregar carrito  saber su identificadro data-id
    if (e.target.classList.contains("agregar-carrito")) {
        const id = e.target.getAttribute("data-id");
        const card = e.target.parentElement.parentElement;
        agregarProducto(id, card);
    }
});

tbody.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("eliminar-producto")) {
        const id = e.target.getAttribute("data-id");
        eliminarItemCarrito(id);
    }
})

function agregarProducto(id, card) {
    infoProducto = {
        id,
        imagen: card.querySelector(".imagen-curso").src,
        nombre: card.querySelector("h4").textContent,
        precio: card.querySelector(".precio span").textContent,
        cantidad: 1
    };

    if (listaCarrito.some(producto => producto.id == id)) {
        const producto = listaCarrito.find(producto => producto.id == id);
        producto.cantidad++
    } else {
        listaCarrito.push(infoProducto)
    }
    console.log(listaCarrito);
    pintarProductos();
 
 
};


function pintarProductos() {
    limpiarCarrito();
    listaCarrito.forEach(producto => {
        const tr = document.createElement("tr");
        const tdImg = document.createElement("td");
        const img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = "imagen del producto";
        img.height = "100";
        tdImg.appendChild(img);
        tr.appendChild(tdImg);

        const tdName = document.createElement("td");
        tdName.textContent = producto.nombre;
        tr.appendChild(tdName);

        const tdPrecio = document.createElement("td")
        tdPrecio.textContent = producto.precio;
        tr.appendChild(tdPrecio);

        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = producto.cantidad;
        tr.appendChild(tdCantidad);

        const tdEliminar = document.createElement("td");
        const btnEliminar = document.createElement("button");

        btnEliminar.textContent = "Eliminar";

        btnEliminar.setAttribute("data-id", producto.id);
        btnEliminar.classList.add("eliminar-producto");
        tdEliminar.appendChild(btnEliminar);

        tr.appendChild(tdEliminar);
        tbody.appendChild(tr);
    });
    console.log(tbody);
   
    //localStorage

 localStorage.setItem("carritoCompras", JSON.stringify(listaCarrito));
}

function limpiarCarrito() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
}

function eliminarItemCarrito(id) {
    const producto = listaCarrito.find(producto => producto.id == id)
    if (producto.cantidad > 1) {
        producto.cantidad--
    } else {
        listaCarrito = listaCarrito.filter((producto) => producto.id != id)
    }
    pintarProductos();
}



