var express = require("express");
var router = express.Router();

module.exports = function(passport){

    //Verificar si el usuario ya inició sesión
    router.get("/exito",(req,res) => {
        res.json(req.user?req.user:null);
    });

    //Iniciar sesión
    router.post("/iniciar",(req,res,next) => {
        passport.authenticate("iniciar",(err,usuario) => {
            if(!usuario){
                res.json({error: err});
            }else{
                req.logIn(usuario, function() {
                    res.json(usuario);
                });
            }
        })(req,res,next);
    });

    //Registrar nuevo usuario
    router.post("/registrar",(req,res,next) => {
        passport.authenticate("registrar",(err,usuario) => {
            if(!usuario){
                res.json({error: err});
            }else{
                req.logIn(usuario, function() {
                    res.json(usuario);
                });
            }
        })(req,res,next);
    });

    //Cerrar sesión
    router.get("/salir",(req,res) => {
        req.logout();
        res.redirect("/");
    });

    return router;
}