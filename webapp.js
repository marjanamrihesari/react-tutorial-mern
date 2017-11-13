var express = require('express');
var app = express();
var mainRouter = require('./routers/mainRouter');
var bodyParser = require('body-parser');


// set up mongoose connection
var mongoose = require('mongoose')
, Schema = mongoose.Schema;
var mongoDB = 'mongodb://admin:123@ds155315.mlab.com:55315/bugs-db';
mongoose.connect(mongoDB,{
  useMongoClient: true
});
var db= mongoose.conncetion;

app.use(express.static('static'));
app.use(bodyParser.json());
app.use('/', mainRouter);

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});