class Producto{
    constructor(nombre, imagen, precio, cantidad){
        this.nombre = nombre;
        this.imagen = imagen;
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
   
    getCarrito(){
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.forEach(producto => {
            this.carrito.push(new Producto(producto.nombre, producto.imagen, producto.precio, producto.cantidad));
        });
    }

    setCarrito(){
        localStorage.removeItem('carrito');
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    borrarItemCarrito(productoNombre) {
        /* Confirmación de eliminación  */
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Este artículo será eliminado del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',  
            cancelButtonColor: '#3085d6',  
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'swal2-popup-custom', 
            }
        }).then((result) => {

            /* Mostrar notificación  */
            if (result.isConfirmed) {
                this.carrito = this.carrito.filter(producto => producto.nombre !== productoNombre);
                this.actualizarCarrito();
    
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: false,
                    background: '#d33', 
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
                    icon: 'error',
                    title: '¡Elemento eliminado!'
                });
            }
        });
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

            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagenCarrito">
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

    async comprar() {
        if (this.carrito.length > 0) {
            const result = await Swal.fire({
                title: '¿Deseas confirmar la compra?',
                text: "No podrás deshacer esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745', 
                cancelButtonColor: '#d33',  
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar',
                customClass: {
                    popup: 'swal2-popup-custom', 
                }
            });
    
            if (result.isConfirmed) {                              
                /* Muestra el mensaje de agradecimiento */
                await Swal.fire({
                    title: '¡Gracias por su compra!',
                    icon: 'success',
                    confirmButtonColor: '#28a745',
                    confirmButtonText: 'OK',
                });

                this.vaciarCarrito();
            }
        }
    }
    
}

carrito1 = new Carrito();
carrito1.getCarrito();
carrito1.mostrarCarrito();
carrito1.actualizarCarrito();








