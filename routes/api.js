var express = require('express');
var router = express.Router();

router.get('/escenarios', function(req, res, next) {
	res.send("Mostrar escenarios disponibles");
});

router.get("/plantillas", function(req, res){
	res.send("Mostrar plantillas disponibles");
});

module.exports = router;