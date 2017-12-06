$(document).ready(function(){

    $("#entrar").click(function(){
        $.ajax({url: "/acceso/iniciar", method: "POST", data: {usuario: $("#usuario").val(), contraseña: $("#contraseña").val()},
            success: function(respuesta){
                if(respuesta.error){
                    alert(respuesta.error);
                }else{
                    window.location.href = "/crear";
                }
            },
            error: function(){
                alert("Error en la DB");
            }
        });
    });

    $("#registrar").click(function(){
        $.ajax({url: "/acceso/registrar", method: "POST", data: {usuario: $("#nusuario").val(), contraseña: $("#ncontraseña").val()},
            success: function(respuesta){
                if(respuesta.error){
                    alert(respuesta.error);
                }else{
                    window.location.href = "/crear";
                }
            },
            error: function(){
                alert("Error en la DB");
            }
        });
    });
});