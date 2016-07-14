var express = require('express');
var moment = require('moment');
var path = require('path');
var fs = require('fs');

var app = express();
var port = 8080;

app.get('/:timeStamp', function(req,res){
    var myDate;
    if (/^\d{8,}$/.test(req.params.timeStamp)) {
        myDate = moment(req.params.timeStamp, "X");
    }
    else {
        myDate = moment(req.params.timeStamp, "MMMM D, YYYY");
    }
    
     if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.get('/',function(req,res){
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
        if (err) throw err;
        res.send(text);
    });
});

app.listen(process.env.PORT || port, function(){
    console.log('Ts-app listening ' );
});