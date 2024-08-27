class Producto{
    constructor(nombre, imgUrl, precio){
        this.nombre = nombre;
        this.imgUrl = imgUrl;
        this.precio = parseFloat(precio);
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
            console.log(cadena);
            contenedorResultadosPc.innerHTML = "";
            contenedorResultadosMobile.innerHTML = "";
            
            this.productos.forEach(producto => {
                if (producto.nombre.toLowerCase().includes(cadena.toLowerCase())){
                    console.log(producto.nombre);
                    
                    contenedorResultadosPc.appendChild(this.mostraarProductosPc(producto));
                    contenedorResultadosMobile.appendChild(this.mostraarProductosMobile(producto));
                }
            }); 
        });
    } 
    
    actualizarNumeroCarrito(){
        let numeroCarrito = document.getElementById("numero-carrito");
        numeroCarrito.innerHTML = this.carrito.length;            
    }

    actualizarPrecioTotal(){
        let precioTotal = document.getElementById("subtotal-precio");
        let total = 0;
        this.carrito.forEach(producto => {
            total += producto.precio;
        });
        precioTotal.innerHTML = `$ ${total}`;
    }

    agregarAlCarrito(productoNombre){
        let producto = this.productos.find(p => p.nombre === productoNombre);
        this.carrito.push(producto);
        this.actualizarNumeroCarrito();
        this.actualizarPrecioTotal();
        this.mostrarCarrito();            
    }
    
    mostrarCarrito(){
        console.log(this.carrito);
        let contenedorCarrito = document.getElementById("objetos-carrito");
        let articuloCarrito = document.createElement('article'); 
        articuloCarrito.classList.add('item-carrito'); 
        
        this.carrito.forEach(producto => {                
            articuloCarrito.innerHTML = `
                <img src="${producto.imgUrl}" alt="${producto.nombre}">
                <div>
                    <h2 class="nombre-producto">
                            ${producto.nombre}
                    </h2>
                    <p class="pprecio">
                        $${producto.precio}
                    </p>
                </div> `; 
                contenedorCarrito.appendChild(articuloCarrito);
                                
        });            
    }

    vaciarCarrito(){
        this.carrito = [];
        this.actualizarNumeroCarrito();
        this.actualizarPrecioTotal();
        let contenedorCarrito = document.getElementById("objetos-carrito");
        contenedorCarrito.innerHTML = "";
        this.mostrarCarrito();
    }

    comprar(){
        let respuesta = confirm("¿Desea confirmar la compra?");
        if (respuesta == true){
            alert("Gracias por su compra");
            this.vaciarCarrito();           
        }
    }
    
    
}

tienda1 = new Tienda();
tienda1.filtrarProductos();
tienda1.actualizarNumeroCarrito();





