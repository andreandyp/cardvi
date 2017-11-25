var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get("/crear", function(req, res){
  res.render("crear.html");
});

module.exports = router;
