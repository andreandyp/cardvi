var express = require('express');
var router = express.Router();

//Página principal
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		res.redirect("/crear");
	}
	else{
		res.render("index.html");
	}
});

router.get("/crear", function(req, res){
	if(req.isAuthenticated()){
		res.render("crear.html");
	}
	else{
		res.redirect("/");
	}
	
});

//Visualizar desde el Cardboard
router.get("/ver/:id", function(req, res){
	res.render("ver.html");
});

//Modificar una animación
router.get("/modificar/:id", function(req, res){
	if(req.isAuthenticated()){
		res.render("modificar.html");
	}else{
		res.redirect("/");
	}
});

module.exports = router;