var maxX = Infinity;
var maxZ = Infinity;

AFRAME.registerComponent('limite', {
    tick: function () {
        let posX = this.el.getAttribute("position").x;
        let posZ = this.el.getAttribute("position").z;

        if(posX > maxX || posX < -maxX || posZ > maxZ || posZ < -maxZ){
            document.querySelector("a-camera").setAttribute("position", {x: Math.trunc(posX), y: 1.6, z: Math.trunc(posZ)});
        }
    }
});

$(document).ready(function(){
    //Cargar animación desde el servidor
    var idurl = new RegExp("[A-Za-z0-9]+$");
    var id = idurl.exec(window.location.href);

    var animacion = {};

    $.ajax({url: "/api/ver/"+id,

    success: function(respuesta){
        animacion = respuesta.animacion
        mostrarAnim(animacion);
    },
    
    error: function(){
        alert("Animación no encontrada");
    }});
});

function mostrarAnim(anim){
    var elementos = anim.elementos;
    for(let i = 0; i < elementos.length; i++){
        let elemActual = document.createElement(elementos[i]["etiqueta"]);
        let atributos = elementos[i]["atributos"];
        for(let j = 0; j < atributos.length; j++){
            elemActual.setAttribute(atributos[j].nombre, atributos[j].valor);
        }
        $("a-scene").prepend(elemActual);
    }

    $("a-camera").attr("limite","");

    maxX = anim.maxX;
    maxZ = anim.maxZ;
}