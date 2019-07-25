var express = require('express');
var Caver = require('caver-js');
var caver = new Caver('https://api.baobab.klaytn.net:8651/');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var databaseUrl = 'mongodb://localhost:27017/test';
mongoose.connect(databaseUrl , {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error',function(){
    console.log('mongodb Connection Failed')
})
db.once('open', function(){
    console.log('mongodb Connected');
})

var User = require('./models/user');

var port = process.env.PORT || 8080;

var router = require('./routes')(app, User)

var server = app.listen(port, function(){
    console.log("Express server has started on port "+ port)
});
