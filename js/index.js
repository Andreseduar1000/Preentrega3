let arreglo_carrito=[];


function carrito(e){

    let hijo= e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;


    let nombrePaquete= padre.querySelector("h5").innerText;
    let preciopaquete=padre.querySelector("span").innerText;
    let imgproducto=abuelo.querySelector("img").src;


    let paquetes={
        nombre:nombrePaquete,
        precio:preciopaquete,
        img:imgproducto,
        cantidad:1

    }
    // ACA SE ENVIAN LOS DATOS AL ARREGLO
    arreglo_carrito.push(paquetes);

    revisar_carrito();
    json();


}

function json(){
    let carritoJson=JSON.stringify(arreglo_carrito);
    localStorage.setItem("paquetes",carritoJson);

    let recuperar_paquetes= localStorage.getItem("paquetes");
    let paquete_parseado=JSON.parse(recuperar_paquetes);
    console.log(paquete_parseado);

}

//IMPRESION DE CARRITO
function revisar_carrito(){
    let tabla = document.getElementById("tbody");

    tabla.innerHTML = "";

    for( let paquetes of arreglo_carrito ){

        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${paquetes.img}"style="width: 8rem;"></td>
                        <td style="font-size: 15px;"><p>${paquetes.nombre}</p></td>
                        <td style="font-size: 15px;">${paquetes.cantidad}</td>
                        <td style="font-size: 15px;">${paquetes.precio}</td>
                        <td><button class="btn btn-danger btnbtn">Borrar</button></td>`;
        tabla.append(fila);
        
    }
    let borrarboton = document.querySelectorAll(".btnbtn");

    for( let btn of borrarboton){
        btn.addEventListener("click" , borrarpaquete );
    }

}




//BORRAR ARTICULOS DEL CARRITO
function borrarpaquete(e){
    console.log("Se elimino: ", e.target );

    let abuelo = e.target.parentNode.parentNode;
    let eliminar=abuelo.querySelector("p").innerText;
    console.log(eliminar);
    
    abuelo.remove();

    function eliminarPaquete(paquetes){
        return paquetes.nombre != eliminar;
    }

    let busquedafilter=arreglo_carrito.filter(eliminarPaquete);
    arreglo_carrito=busquedafilter;
    
}




// EVENTOS GENERALES

let btnCompra = document.getElementsByClassName("boton");

console.log(btnCompra);


for( let botones of btnCompra ){

    botones.addEventListener("click",carrito);
}
//MOSTRAR BOTON
let boton_mostrar=document.getElementById("btnhola");
boton_mostrar.addEventListener("click",mostrar);

function mostrar(){
    document.getElementById('carrito').style.display='block';
}
//OCULTAR BOTON
let boton_ocultar=document.getElementById("btnchao");
boton_ocultar.addEventListener("click",ocultar);

function ocultar(){
    document.getElementById('carrito').style.display='none';
}