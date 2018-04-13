var express = require('express');
var router = express.Router();
var xy = require('../final.js');
/* GET users listing. */

router.get('/', function(req, res) {
	console.log("before cleanup evscleanup");
var	status = xy.evscleanup();
console.log("after cleanup evscleanup");
	  return res.send('EVS DB email verify deletion --   '+ status);
	 
});

module.exports = router;
