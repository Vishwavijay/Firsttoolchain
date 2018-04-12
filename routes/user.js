var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	var xy = require('../final.js');
  res.send('EVS DB email verify deletion - success');
});

module.exports = router;
