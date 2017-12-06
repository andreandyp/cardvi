$(document).ready(function(){
    var idurl = new RegExp("[A-Za-z0-9]+$");
    var id = idurl.exec(window.location.href);

    var animacion = {};

    $.ajax({url: "/api/modificar/"+id,

    success: function(respuesta){
        editarAnim(respuesta);
    },
    
    error: function(xhr, status, error){
        alert(error);
    }});

    $(window).on("beforeunload",function() {
        return "hue";
    });
});

function editarAnim(resp){
    var elementos = resp.animacion.elementos;
    var p = document.createElement("p");
    p.innerText = resp.nombre;
    $("body").append(p);
    for(let i = 0; i < elementos.length; i++){
        p = document.createElement("p");
        p.innerText = elementos[i]["etiqueta"];
        $("body").append(p);
        if(elementos[i]["etiqueta"] === "a-camera"){
            elementos[i]["atributos"].push({"nombre": "maxX", "valor": resp.animacion.maxX});
            elementos[i]["atributos"].push({"nombre": "maxZ", "valor": resp.animacion.maxZ});
        }
        let atributos = elementos[i]["atributos"];
        for(let j = 0; j < atributos.length; j++){
            let label = document.createElement("label");
            label.innerText = atributos[j]["nombre"];
            let input = document.createElement("input");            
            input.setAttribute("type","text");
            input.setAttribute("value",atributos[j]["valor"]);
            $("p").last().append(label);
            $("label").last().append(input);
        }
    }
}

function guardar(base, anim){
    if(base === true){
        //Guardar en base
    }
    else{
        window.localStorage.setItem("animacion", anim);
    }
}