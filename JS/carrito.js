class Producto{
    constructor(nombre, imgUrl, precio, cantidad){
        this.nombre = nombre;
        this.imgUrl = imgUrl;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad || 1;

    }
}

class Carrito{
    constructor(){
        this.productos = [
            new Producto('Jordan 1 Chicago OG 1985', '../media/Moda/exclusivo1.png', 90000),
            new Producto('Under Armour Curry 6 Splash Party', '../media/Moda/exclusivo2.png', 90000),
            new Producto('Nike LeBron 17 Lakers ', '../media/Moda/exclusivo3.png', 90000),
            new Producto('Adidas Dame 6 Ruthless', '../media/Moda/exclusivo4.png', 90000),
            new Producto('Camiseta James Harden Huston Rockets', '../media/Moda/Remeras1.png', 100000),
            new Producto('Camiseta Manu Ginobili San Antonio Spurs', '../media/Moda/Remeras2.png', 85000),
            new Producto('Camiseta LeBron James Los Angeles Lakers', '../media/Moda/Remeras3.png', 100000),
            new Producto('Camiseta Michel Jordan Chicago Bulls', '../media/Moda/Remeras4.png', 80000),
            new Producto('Nike Kyrie 7 University Blue', '../media/Moda/calzado1.png', 90000),
            new Producto('Tatum 2 Legacy', '../media/Moda/calzado2.png', 90000),
            new Producto('Luka 2', '../media/Moda/calzado3.png', 90000),
            new Producto('Harden Vol.8', '../media/Moda/oferta1.png', 63000) 
            ];

        this.carrito = [];
    }

    /* 
    async cargarProductos(){
        try{
            let respuesta = await fetch('../data/productos.json');
            let productos = await respuesta.json();
            productos.forEach(producto => {
                this.productos.push(new Producto(producto.nombre, producto.imgUrl, producto.precio));
            });

        }catch(error){
            console.error('Error al cargar el archivo JSON:');
        }
    }
     */     

    getCarrito(){
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.forEach(producto => {
            this.carrito.push(new Producto(producto.nombre, producto.imgUrl, producto.precio, producto.cantidad));
        });
    }

    setCarrito(){
        localStorage.removeItem('carrito');
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
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
        this.precioTotalCarrito();
        this.mostrarCarrito();
        this.setCarrito()
    }

    vaciarCarrito(){
        this.carrito = [];
        this.actualizarCarrito();
        let contenedorCarrito = document.getElementById("objetos-carrito");
        contenedorCarrito.innerHTML = "";
    }

    /* Mostrar el carrito */
    
    mostrarCarrito(){
        let contenedorCarrito = document.getElementById("objetos-carrito");
        contenedorCarrito.innerHTML = "";

        this.carrito.forEach(producto => {                
            let articuloCarrito = document.createElement('article'); 
            articuloCarrito.classList.add('item-carrito'); 
            articuloCarrito.innerHTML = `
            <div class="cantidad-producto-carrito">
                <p class="cantidad"> ${producto.cantidad} </p>
            </div>

            <img src="${producto.imgUrl}" alt="${producto.nombre}" class="imagenCarrito">
            <div class="dettallesProductoCarrito">
            <h2 class="nombre-producto">
            ${producto.nombre}
            </h2>
            <div>
            <p class="pprecio">
            $${producto.precio}
            </p>
            <button id="boton-borrar" onclick="carrito1.borrarItemCarrito('${producto.nombre}') ">
            <img src="../media/Iconos/icono-basurero.png" alt="icono basurero" id="icono-borrar-carrito">
                        </button>
                    </div>
                </div>`; 
                     
            contenedorCarrito.appendChild(articuloCarrito);
        });            
    }    

    precioTotalCarrito(){
        let precioTotal = document.getElementById("subtotal-precio");
        let total = 0;
        this.carrito.forEach(producto => {
            total += producto.precio;
        });
        precioTotal.innerHTML = `$ ${total}`;
    }

    comprar(){
        let respuesta = confirm("¿Desea confirmar la compra?");
        if (respuesta == true){
            alert("Gracias por su compra");
            this.vaciarCarrito();           
        }
    }
    
    
}

carrito1 = new Carrito();
carrito1.getCarrito();
carrito1.mostrarCarrito();
carrito1.actualizarCarrito();


/* hay que conectar el json para la lista de objetos y aca hacer toda la estructura del try/catch */





