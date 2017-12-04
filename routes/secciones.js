var express = require('express');
var router = express.Router();

//Página principal
router.get('/', function(req, res, next) {
	res.render('index.html');
});

//Página principal (sesión iniciada)
router.get('/inicio', function(req, res, next) {
	res.render('index.html');
});

//Crear nueva animación
router.get("/crear", function(req, res){
	res.render("crear.html");
});

router.get("/iniciar", function(req, res){
	res.render("Iniciar sesión");
});

router.get("/registrar", function(req, res){
	res.render("Registar nuevo usuario");
});

//Visualizar desde el Cardboard
router.get("/ver/:id", function(req, res){
	res.render("ver.html");
});

//Transmitir hacia el Cardboard
router.get("/transmitir/:id", function(req, res){
	res.send(req.params.id);
});

//Modificar una animación
router.get("/modificar/:id", function(req, res){
	if(!req.isAuthenticated()){
		res.redirect("/");
	}else{
		res.send("yay");
	}
});

module.exports = router;