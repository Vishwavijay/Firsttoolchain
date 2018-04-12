//Auther :- Vishwavijay Singh Pawar - vishwavi@us.ibm.com Date:- April 12, 2018
// Database 
var cloudantDB = null;
// Connect initialization
var Cloudant = require('cloudant');
//Properties read
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties.file');
//Logging using le_node and connection with Logentries
var Logger = require('le_node');
var logger = new Logger({
  token:'fdd6e838-64f0-49a6-9cf3-82ab11464fbb'
});

//id password decryption
var jwt = require('jwt-simple');
var secret = properties.get('main.secret');
var decode_id = jwt.decode(properties.get('main.account_id'), secret);
var decode_pass = jwt.decode(properties.get('main.password'), secret);
logger.info("userid is used for the login --"+ decode_id);
Cloudant(
 {  
  account: decode_id,
  password: decode_pass
}, 
function( error, cloudant ) {
  if( error ) {
	  logger.info("Could not connect to Cloudant , Please check the Credentials");
	  logger.info("Error Message --"+ error.message);
  }    
  logger.info("Connected to database");
  // Use database
  // Assumes the database exists
  logger.info("Using database");
  cloudantDB = cloudant.db.use( "testemailverify" );
  var limit_days = properties.get('main.limit_days');
  var limit_count = properties.get('main.limit_count');
  var end_date = new Date();
  end_date.setDate(end_date.getDate()-limit_days);
  logger.info("End Date " + end_date);
  cloudantDB.view('VerifyConfirmed', 'confirmed-new-view', {
   'include_docs': true,
   'endkey' : end_date,
   'limit' : limit_count,
 }, function(err, body) {
  if (!err) {
	  logger.info("Total count of the records for email verify deletion are:-------   " + body.rows.length); 
	for (var i = 0, len = body.rows.length; i < len; i++) {
		logger.info("id: "+ body.rows[i].id + " -rev- " +  body.rows[i].doc._rev );
		//cloudantDB.destroy(body.rows[i].id, body.rows[i].doc._rev, function(err, data) {
				if (err) {
					res.json({err:err});
					return;
}
 }
 }
 else{
	 logger.info("Error Message "+ err);}
 });
  logger.info("Batch Job of email verify is completed for " + limit_days +" days, till "  + end_date + " Please check logentries.com emailverify for details.");
} );




