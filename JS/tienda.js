class Producto{
    constructor(nombre, imgUrl, precio, cantidad){
        this.nombre = nombre;
        this.imgUrl = imgUrl;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad || 1;

    }
}

class Tienda{
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

    /* filtrar los productos con el imput del buscador */    
    filtrarProductos(){
        let inputBuscador = document.getElementById("buscar-input"); //recibe el input del buscador
        let contenedorResultadosPc = document.getElementById("venta-pc"); //aca se muestran los productos en pc
        let contenedorResultadosMobile = document.getElementById("venta-mobile"); //aca se muestran los productos en mobile
        
        this.productos.forEach(producto => {
            contenedorResultadosPc.appendChild(this.mostraarProductosPc(producto));
            contenedorResultadosMobile.appendChild(this.mostraarProductosMobile(producto));
        });

        inputBuscador.addEventListener("input", (e) => {
            let cadena = inputBuscador.value;
            contenedorResultadosPc.innerHTML = "";
            contenedorResultadosMobile.innerHTML = "";
            
            this.productos.forEach(producto => {
                if (producto.nombre.toLowerCase().includes(cadena.toLowerCase())){
                    
                    contenedorResultadosPc.appendChild(this.mostraarProductosPc(producto));
                    contenedorResultadosMobile.appendChild(this.mostraarProductosMobile(producto));
                }
            }); 
        });
    } 

    /* Mostrar los productos buscados en el buscador */
    mostraarProductosPc(producto){

        let articuloPc = document.createElement('article'); //creamos el aritculo para desktop
        articuloPc.classList.add('conteiner', 'articulo-moda', 'conteiner-venta'); //agregamos las clases
        
        articuloPc.innerHTML = `
            <img src="${producto.imgUrl}" alt="${producto.nombre}">
            <p class="nombre-producto"> ${producto.nombre} </p>
            <div>
                <p class="precio"> $${producto.precio}</p>
                <button class="add-to-cart" onclick="tienda1.agregarAlCarrito('${producto.nombre}')">
                    <img src="../media/Iconos/icono-carrito.png" alt="Icono carrito">
                </button>
            </div>`;     
               
        return articuloPc;              
    }

    mostraarProductosMobile(producto){
        let articuloMobile = document.createElement('div'); //creamos el aritculo para desktop
        articuloMobile.classList.add('carousel-item', 'active');//agregamos las clases

        articuloMobile.innerHTML = `
            <article class="conteiner articulo-moda conteiner-venta">
                <img src="${producto.imgUrl}" alt="${producto.nombre}">
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
            let productoNuevo = new Producto(producto.nombre, producto.imgUrl, producto.precio, 1)
            this.carrito.push(productoNuevo);
        }    
        this.actualizarCarrito(); 
    }        
    

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

tienda1 = new Tienda();
tienda1.getCarrito();
tienda1.filtrarProductos();
tienda1.actualizarCarrito();


/* hay que conectar el json para la lista de objetos y aca hacer toda la estructura del try/catch */





