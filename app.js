var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var port = 3005;

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get('/', function(req,res){
	res.sendFile(__dirname +'/public');
});

app.listen(port,function(){
	console.log('server running on Port ' + port);
});