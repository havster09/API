var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}
else{
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var bookRouter = require('./routes/bookroutes')(Book);

app.use('/api/books',bookRouter);
//app.use('/api/author',authorRouter);

app.get('/',function(req,res){
   res.send('welcome to api');
});

app.listen(port,function(){
   console.log('gulp is running on '+port);
});

module.exports = app;