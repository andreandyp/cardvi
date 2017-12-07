"use strict";

$(document).ready(function(){

    var anim = inicializar();

    $(window).on("beforeunload",function() {
        /*anim = crearJSON();
        guardar(anim, false);
        return "hue";*/
    });

    $("#guardar").click(function(){
        anim = crearJSON();
        console.log(JSON.stringify(anim));
        guardar(anim, true);
        anim = {};
    });
});

function crearJSON(){
    var animacion = { elementos: []};
    var editor = $("#editor").children();

    //Iterar a través de los divs del editor
    for(let elemento = 1; elemento < editor.length; elemento++){
        let elem = { etiqueta: "", atributos: []};
        let hijos = editor[elemento].children;
        
        //Iterar a través de los elementos de cada DIV
        let atrib = {};
        for(let i = 0; i < hijos.length; i++){
            
            if(hijos[i].tagName.toLowerCase() === "p"){
                elem["etiqueta"] = hijos[i].innerText;
            }else{
                if(elem["etiqueta"] === "a-camera"){
                    continue;
                }
                
                if(hijos[i].tagName.toLowerCase() === "label"){
                    atrib["nombre"] = hijos[i].innerText;
                }
                else{
                    atrib["valor"] = hijos[i].value;
                }

                if(atrib["nombre"] && atrib["valor"]){
                    elem["atributos"].push(atrib);
                    atrib = {};
                }
            }
            
        }
        animacion.elementos.push(elem);
    }
    animacion.maxX = parseInt($("#maxX").val());
    animacion.maxZ = parseInt($("#maxZ").val());
    
    return animacion;
}

function inicializar(){
    var idurl = new RegExp("[A-Za-z0-9]+$");
    var id = idurl.exec(window.location.href);

    $.ajax({url: "/api/modificar/"+id,
    success: function(respuesta){
        var animLocal = window.localStorage.getItem("animacion");
        animLocal = JSON.parse(animLocal);
        if(animLocal !== null){
            alert("Animación local");
            editarAnim({animacion: animLocal, nombre: respuesta.nombre});
            return animLocal;
        }else{
            alert("Animación desde el servidor");
            console.log(JSON.stringify(respuesta.animacion));
            editarAnim(respuesta);
            return respuesta.animacion;
        }
        
    },
    error: function(xhr, status, error){
        alert(xhr.responseJSON.error);
    }});
}

function editarAnim(resp){
    var elementos = resp.animacion.elementos;
    var nombre = document.createElement("h3");
    nombre.innerText = resp.nombre;
    $("#editor").append(nombre);

    for(let i = 0; i < elementos.length; i++){
        let div = document.createElement("div");
        $("#editor").append(div);
        let titulo = document.createElement("p");
        titulo.innerText = elementos[i]["etiqueta"];
        $("#editor div").last().append(titulo);

        if(elementos[i]["etiqueta"] === "a-camera"){
            elementos[i]["atributos"].push({"nombre": "maxX", "valor": resp.animacion.maxX});
            elementos[i]["atributos"].push({"nombre": "maxZ", "valor": resp.animacion.maxZ});
        }

        let atributos = elementos[i]["atributos"];
        for(let j = 0; j < atributos.length; j++){
            let label = document.createElement("label");
            label.innerText = atributos[j]["nombre"];

            let input = document.createElement("input");
            if(label.innerText === "maxX" || label.innerText === "maxZ"){
                input.setAttribute("id",label.innerText);
            }
            input.setAttribute("type","text");
            input.setAttribute("value",atributos[j]["valor"]);

            //Esto funciona así y sólo así y no sé porque
            $("p").last().after(input);
            $("p").last().after(label);
        }
    }
}

function guardar(anim, base){
    if(base === true){
        window.localStorage.removeItem("animacion");
    }
    else{
        window.localStorage.setItem("animacion", JSON.stringify(anim));
    }
}