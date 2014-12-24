var express = require('express');
var serve = require('serve-static');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');

var config = require('./config');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(serve(__dirname + '/public'));
// app.use(bodyParser());
app.use(multer({ dest: config.uploadTmp }));


var pageRoute = require('./route-page');

app.get('/', pageRoute.index);
app.get('/dashboard/signin', pageRoute.dashboardSignIn);
app.get('/dashboard/signup', pageRoute.dashboardSignUp);
app.get(/\/dashboard(\/.+)?/, pageRoute.dashboard);

var apiRoute = require('./route-api');
var API_BASE_URL = '/api';

app.post(API_BASE_URL+'/photo', apiRoute.photo.upload);

app.get('/500', function(req, res, next){
    res.render('500', {
        req: req,
        err: {msg: 'no msg'}
    });
});
app.get('/404', function(req, res, next){
    res.render('404', {
        req: res
    });
});


function isXHR(req){
    return (req.path.indexOf('/api/') == 0)
}

app.use(function(err, req, res, next){
    console.log(err);
    if( isXHR(req) ){
        res.send({
            code: 500,
            msg: err.toString()
        });
    }
    else{
        res.render('500', {req: req, err: err});
    }
});
var server = app.listen(3006, function(){
    var port = server.address().port;
    console.log('app listening at ', port);
});