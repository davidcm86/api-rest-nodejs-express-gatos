var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require('mongoose');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use(methodOverride());

// Route index
var router = express.Router();
	router.get('/', function(req, res) {
	res.send("Hello world!!!!");
});
app.use(router);

// Start server
app.listen(3000, function() {
	console.log("Node server running on http://localhost:3000");
});