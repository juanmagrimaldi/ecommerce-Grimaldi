//  6- capturo por id el div padre de nuestras cards que se llama shopContent para luego agegarle todo lo creado en nuestro js.
const shopContent = document.getElementById("shopContent");

//  10- Creo la variable verCarrito que corresponde a la id de mi carrito en el navbar de mi html, la idea es que podamos ver una tabla o modal que muestre mis productos seleccionados simulando un carrito de compras.
const verCarrito = document.getElementById("verCarrito");

//  12- capturo el div padre del carrito para luego con .append agregarle los productos seleccionados por el cliente.
const carritoCompras = document.getElementById("carritoCompras");

//  40- el span del html al lado del "🛒" es el contador de productos, para continuar debo llamarlo a través de su id.
const contadorCarrito = document.getElementById("contadorCarrito");

//  2- Construyo un array vacío donde irán los productos seleccionados.
//  48- Antes era un array vacío pero ahora necesitamos que el carrito sea aquel seteado en localStorage o un array vacío en caso de que haya algún error.
//  49- Ahora bien, si refrescamos la página pasarán dos cosas, por un lado los productos quedan almacenados en el local, pero no en el carrito. Para solucionar ésto usamos get.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//  3- al array productos le agrego la propiedad forEach para que tome a cada objeto dentro del producto.
productos.forEach((producto) => {

    //  Creo una variable que sea un div-card con cada dato del producto.
    let card = document.createElement("div");

    //  4- agrego la propiedad .className a la card asi le agrego estilos a la card a través de mi css.
    card.className = "card";

    //  5- Luego de tener la card creada a través del document.createElement hay que agregarle a la misma contenido HTML con la propiedad card.innerHTML.
    card.innerHTML = 
    `<img src="${producto.imagen}">
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    `;

    //  7- mediante la propiedad append enchufo las cards al id del div padre. Para que quede el div padre y luego las cards del forEach.
    shopContent.append(card);
    
    //  8- Creo un botón que agregue al carrito el producto seleccionado, para eso necesito crearlo y luego agregarlo a las cards con .append.
    let botonComprar = document.createElement("button");
    botonComprar.innerText = "Comprar";
    card.append(botonComprar);

//  9- Agrego funcionalidad al botón comprar, para eso agrego un listener al click y le pongo la funcion pushear al carrito. (verifico con un console.log el funcionamiento de mi listener).
    botonComprar.addEventListener("click", () => {

        //  35- Utilizo el método some en el array carrito, que devuelve booleano, para saber si hay más de un producto con la misma id, osea en esecia, que se haya comprado más de una vez un mismo producto, para eso usamos su id.
        const repetirProducto = carrito.some((elemento) => elemento.id === producto.id);
            
        //  36- Utilizaremos un condicional: si repetirProducto es verdadero, haga una cosa, si es falso hará otra.
        if (repetirProducto) {
            //  37- busco con .map aquel producto que tenga la misma id que aquel primer producto que el cliente añadió al carrito y luego seleccionó nuevamente.
            carrito.map((elemento) => {
                //  38- Si el elemento es igual al producto con la misma id, entonces con ++ le agregamos "n" productos, tal que "n" sea la cantidad de veces que clickeamos en comprar dicho producto.
                if(elemento.id === producto.id) {
                    elemento.cantidad++;
                }
            });
        }else{
            //  39- Si lo antes dicho es falso entonces que pushee otro producto normalmente.
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: producto.cantidad
            });
        }
        //  44-  Agregamos la función del contador luego del pusheo de los productos.
        agregarContadorCarrito()

        //  47- agregamos acá la función, luego del pusheo de productos.
        setLocalCarrito();
    });
});

//  46- En este paso comenzamos a agregar localStorage. En "set" usamos .strigify para que vuelva string los valores de las variables y en "get" usamos parse para que parsee aquellos valores que traemos en string.
const setLocalCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

    