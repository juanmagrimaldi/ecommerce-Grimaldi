//  11- Creo una función crearCarrito con un listener, le doy al "click" la funcionalidad de crear un modal/tabla simulando un carrito y con .append se lo agrego al div padre que contiene la id del div padre del html.
const crearCarrito = () => {
    //  24- cuando clickeamos el carrito, el click crea el carrito con cada elemento, entonces si lo clikeamos "n" veces, habrá "n" carritos, para solucionarlo lo que tenemos que hacer es agregar un innerHTML vacío.
    carritoCompras.innerHTML = "";

    //  23- como le quite el display en el paso 22, le agrego al carrito de compras la visibilidad con display flex o block, etc. yo uso flex porque va con mi diseño.
    carritoCompras.style.display = "flex";
    const headerCarrito = document.createElement("div");
    headerCarrito.className = "header-carrito";
    headerCarrito.innerHTML = `
    <h1 class"header-carrito-title">Carrito de compras</h1>
    `;
    carritoCompras.append(headerCarrito);

    //  13- Creo un botón que en realidad es un h1 con una "x" que simula un closer.
    const botonCarritoCompras = document.createElement("h1");
    botonCarritoCompras.innerText = "x";
    botonCarritoCompras.className = "header-carrito-boton";

    //  22- agrego la funcionalidad del botón del header del carrito, asi podemos cerrar el mismo. Para eso uso un addEventListener.
    botonCarritoCompras.addEventListener("click", () => {
        carritoCompras.style.display = "none";
    });

    //  14- Le agrego al header del carrito el botón con append.
    headerCarrito.append(botonCarritoCompras);
    //  15- ahora hacemos lo mismo que en la lista de productos, pero con el array carrito.
    carrito.forEach((productocarrito) => {
        //  16- creo las cards de los productos del carrito y le agrego sus datos nombre, precio, img del mismo modo que cuando creamos el shop content.
        let cardCarrito = document.createElement("div");
        cardCarrito.className = "card-carrito";
        cardCarrito.innerHTML = `
        <img src="${productocarrito.imagen}">
        <h3>${productocarrito.nombre}</h3>
        <p>$${productocarrito.precio}</p>
        <span class="restar"> - </span>
        <p>Cantidad: ${productocarrito.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: $${productocarrito.cantidad * productocarrito.precio}</p>
        <span class="boton-eliminar-producto"> ❌ </span>
        `;
        //  17- con append agrego la card al carrito de compras.
        carritoCompras.append(cardCarrito);

        //  54- Luego de agregar las etiquetas span de suma y de resta en la card del carrito procedemos a agregarle funcionalidad a las mismas.
        //  55- La primer funcionalidad es la de la resta, para eso seleccionamos con un queryselector la clase ".restar" que se encuentre en la card del carrito.
        let restar = cardCarrito.querySelector(".restar");

        //  56- Le agrego un escuchador de eventos al click en restar.
        restar.addEventListener("click", () => {
            
            //  59- Para que no se vayan a números negativos en la sustracción de productos y que el mínimo sea 1, agregamos un condicional.
            if(productocarrito.cantidad !== 1){
                //  57-  modificaremos sustrayendo el valor de productocarrito.cantidad, que es aquel valor que nos determina la cantidad.
                productocarrito.cantidad--;
            };
            //  60- Agregamos en el local las modificaciones de resta.
            setLocalCarrito();
            
            //  58- Llamo nuevamente a la función crearCarrito para que se valide visualmente la modificación efectuada. Osea, se vean los cambios realizados.
            crearCarrito();
        }); 
        
        //  60- Procedemos a hacer lo mismo en "sumar".
        let sumar = cardCarrito.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            productocarrito.cantidad++;
            setLocalCarrito();
            crearCarrito();
        });

        //  26- Creo un botón para eliminar del carrito aquel producto que se puso por equivocación o se quiere eliminar por arrepentimiento. Para eso primero enlazo la clase del botón perteneciente a la card con un querySelector a la variable creada.
        let botonEliminarProducto = cardCarrito.querySelector(".boton-eliminar-producto");

        //  27- Le paso el escuchador de eventos (click en este caso) al botón. 
        botonEliminarProducto.addEventListener("click", () => {

            //  28- Acá le agrego la función eliminarProducto
            //  29- Su parámetro debe ser el id del producto del carrito.
            eliminarProducto(productocarrito.id);
        });
    });

    //  18- creamos una variable "total" que sera el array carrito con su propiedad reduce para hacer la suma total de cada compra.
    const total = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);

    //  19- creamos el footer del carrito. Donde irá el precio final a pagar.
    const footerCarrito = document.createElement("div");
    footerCarrito.className = "footer-carrito";

    //  20- le agregamos el total.
    footerCarrito.innerHTML = `Total a pagar: $ ${total}`;
    
    // 21- le agregamos el footer al carrito.
    carritoCompras.append(footerCarrito);

};
//  25- a verCarrito le agrego un listener sobre el click para que me cree el carrito, osea, se haga uso de la función crearCarrito.
verCarrito.addEventListener("click", crearCarrito);

//  30- creo una función que elimine productos, para eso uso carrito.find según ID y  después de encontar según id uso carrito.filter para eliminarlo.
const eliminarProducto = (id) => {
    
    //  31- Del array carrito, busco con .find aquel producto que tenga "x" id.
    //  34- Para mayor especificidad, al elemento.id lo igualo a id (que al ser el parámetro de la función va a ser lo mismo que productocarrito.id).
    const productoId = carrito.find((elemento) => elemento.id === id);
    
    //  32- al array carrito lo piso con la propiedad .filter, para que ahora el array carrito sea todos los productos que tiene agregados menos el quitado por la función.
    carrito = carrito.filter((elemento) => {
        return elemento !== productoId;
    });
    //  45- ponemos la función acá debido a que cuando querramos eliminar productos del carrito, el contador también debe cambiar.
    agregarContadorCarrito();

    //  53- Si borramos productos del carrito y refrescamos la página no nos elimina los productos, eso es porque no agregamos la función que guarda los productos en localStorage. Por eso procedemos a agregarlo.
    setLocalCarrito();

    //  33- Llamo a crearCarrito, ya que me realiza la creación de un nuevo carrito pero sin ese producto.
    crearCarrito();

};
//  41- Creamos la función que agregue el "productos.length".
const agregarContadorCarrito = () => {
    //  42- cambiamos el display que estaba en none a block, osea, pasa de no verse a verse cuando le demos click, para eso, llamaremos a ésta función cuando demos click en algún producto.
    contadorCarrito.style.display = "block";

    //  50- Agrego el length del carrito a la local, asi cuando refresquemos la página el contador siga teniendo el número de productos.
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    
    //  51- Ahora después de seteado hay que llamarlo con getItem, particularmente hay que agregarlo al contador, osea a "contadorCarrito";
    contadorCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

    //  43- Le agrego al contadorCarrito la cantidad de productos diferentes del carrito con un innerText del length del carrito.
    contadorCarrito.innerText = carrito.length;

};

//  52- Agrego el contador: ahora con el dato length almacenado en localStorage llamo a la función agregarContadorCarrito.
agregarContadorCarrito();