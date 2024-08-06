
// Crear usuario
class Usuario{
    constructor(usuario, correo, contrasena){
        this.usuario = usuario;
        this.correo = correo;
        this.contrasena = contrasena;
    }
    registrarUsuario(){
        this.correo = prompt("Ingresa tu correo");
        this.usuario = prompt("Crea tu usuario");
        let contrasena = prompt("Crea tu contrasena");
        let confirmContrasena = prompt("Confirma tu contrasena");
        while(contrasena != confirmContrasena){
            alert("Las contrasenas no coinciden");
            contrasena = prompt("Crea tu contrasena");
            confirmContrasena = prompt("Confirma tu contrasena");
        }
        this.contrasena = contrasena;
        alert("Usuario registrado con exito");
    }
    iniciarSesion(){
        let usuario = prompt("Ingresa tu usuario");
        if(usuario != this.usuario){
            alert("Usuario incorrecto, intente de nuevo");
            this.iniciarSesion();
        }
        let contrasena = prompt("Ingresa tu contrasena");
        while(contrasena != this.contrasena){
            alert("Contrasena incorrecta, intente de nuevo");
            contrasena = prompt("Ingresa tu contrasena");
        }
    }
    //si o si hay que crear un usuario, porque sino no hay nada guardado en los datos del Usuario. Si hubiera una base de datos, se podria hacer un login directamente
}

class Producto{
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

class Tienda{
    constructor(){
        this.productos = [];
        this.carrito = [];
    }

    agregarProductos(Producto){
        this.productos.push({nombre: Producto.nombre, precio: Producto.precio});        
    }

    mostrarProductos(){
        for (const producto of this.productos) {
            console.log(producto.nombre + " " + "$" + producto.precio);
        }
    }

    agregarCarrito(nombreProducto){ 
        for (const producto of this.productos) {
            if (producto.nombre === nombreProducto) {
                this.carrito.push(producto);
            }
        }
    }

    mostrarCarrito(){
        for (const producto of this.carrito) {
            console.log(producto.nombre + " " + "$" + producto.precio);
        }
    }

    calcularPrecio(){
        let total = 0;
        for (const producto of this.carrito) {
            total += producto.precio;
        }
        return(total);
    }

    comprar(){
        console.log("Usted va a comprar los siguientes productos:");
        this.mostrarCarrito();
        console.log("El total de su compra es de: $" + this.calcularPrecio());
        this.carrito = [];
    }
}


//REGISTRO E INICIO DE SESION

let inicioRegistro = confirm("¿Tienes usuario?");
if(inicioRegistro == true){
    let usuario = new Usuario();
    usuario.iniciarSesion();
}else{
    let usuario = new Usuario();
    usuario.registrarUsuario();
    usuario.iniciarSesion();
}


//CARRITO

//creamos un objeto tienda
tienda1 = new Tienda();
//creamos los objetos que va a tener en stock la tienda y los agregamos a la tienda
tienda1.agregarProductos(new Producto("Jordan 1 Chicago OG 1985", 90000));
tienda1.agregarProductos(new Producto("Under Armour Curry 6 'Splash Party'", 90000));
tienda1.agregarProductos(new Producto("Nike LeBron 17 'Lakers'", 90000));
tienda1.agregarProductos(new Producto("Adidas Dame 6 'Ruthless'", 90000));
tienda1.agregarProductos(new Producto("Camiseta James Harden Huston Rockets", 100000));
tienda1.agregarProductos(new Producto("Camiseta Manu Ginobili San Antonio Spurs", 85000));
tienda1.agregarProductos(new Producto("Camiseta LeBron James Los Angeles Lakers", 100000));
tienda1.agregarProductos(new Producto("Camiseta Michel Jordan Chicago Bulls", 80000));
//mostramos los productos disponibles cargados previamente
console.log("Productos disponibles:");
tienda1.mostrarProductos();
//selecionamos los productos que queremos agregar al carrito
tienda1.agregarCarrito("Jordan 1 Chicago OG 1985");
tienda1.agregarCarrito("Camiseta Michel Jordan Chicago Bulls");
//mostramos el carrito
console.log("\nProductos del carrito:");
tienda1.mostrarCarrito();
//usamos la funcion comprar
console.log("\nComprando :)");
tienda1.comprar();
//corroboramos que el carrito este vacio
console.log("\nProductos del carrito:");
tienda1.mostrarCarrito();

//todo esto lo hago para ir comprobando que todas las funciones esten funcionando correctamente














