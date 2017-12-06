$(document).ready(function(){
    $("#salir").click(function(){
        $.ajax({
            url: "/acceso/salir",
            success: function(){
                window.location.href = "/";
            }
        });
    });
});