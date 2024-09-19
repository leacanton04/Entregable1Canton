class Producto{
    constructor(nombre, imagen, precio, cantidad){
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad || 1;

    }
}

class Tienda{
    constructor(productos){
        this.productos = productos;
        this.carrito = [];
    }


    /* filtrar los productos con el imput del buscador */    
    filtrarProductos(){
        let inputBuscador = document.getElementById("buscar-input");
        let contenedorResultadosPc = document.getElementById("venta-pc"); 
        let contenedorResultadosMobile = document.getElementById("venta-mobile");
        
        this.productos.forEach(producto => {
            contenedorResultadosPc.appendChild(this.mostrarProductosPc(producto));
            contenedorResultadosMobile.appendChild(this.mostrarProductosMobile(producto));
        });

        inputBuscador.addEventListener("input", (e) => {
            let cadena = inputBuscador.value;
            contenedorResultadosPc.innerHTML = "";
            contenedorResultadosMobile.innerHTML = "";
            
            this.productos.forEach(producto => {
                if (producto.nombre.toLowerCase().includes(cadena.toLowerCase())){
                    
                    contenedorResultadosPc.appendChild(this.mostrarProductosPc(producto));
                    contenedorResultadosMobile.appendChild(this.mostrarProductosMobile(producto));
                }
            }); 
        });
    } 


    /* Mostrar los productos buscados en el buscador */

    mostrarProductosPc(producto){
        let articuloPc = document.createElement('article'); 
        articuloPc.classList.add('conteiner', 'articulo-moda', 'conteiner-venta'); 

        articuloPc.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="nombre-producto"> ${producto.nombre} </p>
            <div>
                <p class="precio"> $${producto.precio}</p>
                <button class="add-to-cart">
                    <img src="../media/Iconos/icono-carrito.png" alt="Icono carrito">
                </button>
            </div>`;

        articuloPc.querySelector('.add-to-cart').addEventListener('click', () => {
            tienda1.agregarAlCarrito(producto.nombre);
        });

        return articuloPc;              
    }

    mostrarProductosMobile(producto){
        let articuloMobile = document.createElement('div'); 
        articuloMobile.classList.add('carousel-item', 'active');

        articuloMobile.innerHTML = `
            <article class="conteiner articulo-moda conteiner-venta">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p class="nombre-producto"> ${producto.nombre} </p>
                <div>
                    <p class="precio"> $${producto.precio}</p>
                    <button class="add-to-cart" onclick="tienda1.agregarAlCarrito('${producto.nombre}')">
                        <img src="../media/Iconos/icono-carrito.png" alt="Icono carrito">
                    </button>
                </div>
            </article>`;

        return articuloMobile;
    }
    

    /* Gestionar carrito */

    agregarAlCarrito(productoNombre) {
        
        let producto = this.productos.find(p => p.nombre === productoNombre);   
        let productoEnCarrito = this.carrito.find(p => p.nombre === productoNombre);
    
        if (productoEnCarrito) {            
            productoEnCarrito.cantidad++;
            productoEnCarrito.precio = producto.precio * productoEnCarrito.cantidad;
            this.setCarrito();
        } else {
            let productoNuevo = new Producto(producto.nombre, producto.imagen, producto.precio, 1)
            this.carrito.push(productoNuevo);
        }    
        this.actualizarCarrito(); 

        // Mostrar notificación 
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: false,
            background: '#28a745',  
            iconColor: '#fff',
            customClass: {
                popup: 'colored-toast'
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        Toast.fire({
            icon: 'success',
            title: '¡Elemento agregado con éxito!'
        });
    }        

    getCarrito(){
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.forEach(producto => {
            this.carrito.push(new Producto(producto.nombre, producto.imagen, producto.precio, producto.cantidad));
        });

        this.actualizarCarrito();
    }

    setCarrito(){
        localStorage.removeItem('carrito');
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    actualizarNumeroCarrito(){
        let cantidadCarrito = 0;
        this.carrito.forEach(producto => {
            cantidadCarrito += producto.cantidad;
        });
        let numeroCarrito = document.getElementById("numero-carrito");
        numeroCarrito.innerHTML = cantidadCarrito;
    }

    borrarItemCarrito(productoNombre) {
        this.carrito.forEach((producto, index) => {
            if (producto.nombre === productoNombre) {
                this.carrito.splice(index, 1);
            }
        });
        this.actualizarCarrito();
    }

    actualizarCarrito(){
        this.actualizarNumeroCarrito();                
        this.setCarrito()
    }

    vaciarCarrito(){
        this.carrito = [];
        this.actualizarCarrito();
        let contenedorCarrito = document.getElementById("objetos-carrito");
        contenedorCarrito.innerHTML = "";
    }
}


let tienda1; 

async function fetchData() {
    const apiUrl = "https://mocki.io/v1/a71141ee-0e4f-4207-812d-f5c2b09c33e0";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const productos = data.productos;  
        
        tienda1 = new Tienda(productos);   
        console.log(tienda1.productos);      
        
        tienda1.getCarrito();
        tienda1.filtrarProductos();

    } catch (error) {
        console.error(error);
    }
}

fetchData();