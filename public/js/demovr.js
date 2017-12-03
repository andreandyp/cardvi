AFRAME.registerComponent('limite', {
    tick: function () {
        let posX = this.el.getAttribute("position").x;
        let posZ = this.el.getAttribute("position").z;

        if(posX > 3 || posX < -3 || posZ > 3 || posZ < -3){
            document.querySelector("a-camera").setAttribute("position", {x: Math.trunc(posX), y: 1.6, z: Math.trunc(posZ)});
        }
    }
  });
$(document).ready(() =>{
    var animacion = { elementos: []};
    $("#cambiar").click(function(){
        var conjunto = $("a-scene").children();

        for(let elemento in conjunto){
            var elem = { atributos: []};
            var atributo = {};
            
            elem["etiqueta"] = conjunto[elemento].tagName.toLowerCase();

            var atributos = conjunto[elemento].attributes;
            for(let i = 0; i < atributos.length; i++){
                if(atributos[i].value){
                    atributo = {nombre: atributos[i].name, valor: atributos[i].value};
                    elem["atributos"].push(atributo);
                    atributo = {};
                }                
            }
            animacion.elementos.push(elem);
            if(conjunto[elemento].tagName.toLowerCase() === "a-camera"){
                break;
            }
        }
        
        alert("Elemento guardado");
    });
});