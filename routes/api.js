var express = require('express');
var router = express.Router();
var db = require("../config/base");
var ObjectId = require("mongodb").ObjectID;

router.get('/escenarios', function(req, res, next) {
	res.send("Mostrar escenarios disponibles");
});

router.get("/plantillas", function(req, res){
	res.send("Mostrar plantillas disponibles");
});

router.get("/animaciones/:id", function(req, res){
	db.get().collection("animaciones").findOne(
		{_id: new ObjectId(req.params.id)},
		{_id: 0},
		(err, animacion) => {
			if (err) {
				return res.status(500).json({ mensaje: "Error en la db: " + err });
			}
			if(!animacion){
				return res.status(500).json({error: "Animacion no encontrada"});
			}
			
			return res.send(animacion);
		}
	);
	// 5a248b38d296b5244d108ab5
});

module.exports = router;