var express = require('express');
var router = express.Router();

router.get('/escenarios', function(req, res, next) {
	res.send("Mostrar escenarios disponibles");
});

router.get("/plantillas", function(req, res){
	res.send("Mostrar plantillas disponibles");
});

router.post("/iniciar", function(req, res){
	res.send("Iniciar sesión");
});

router.post("/registrar", function(req, res){
	res.send("Registrar");
});
module.exports = router;