var express = require('express');

var binder = require('./binder');

var config = require('./config');
var getModel = require('./model');

var app = express();

function startAppWhenReady(){
    setTimeout(function(){
        m = getModel();
        if(m.photo){
            binder.setup(app);
            binder.useMiddleware(app);
            binder.pageRoutes(app);
            binder.apiRoutes(app);

            var server = app.listen(3006, function(){
                var port = server.address().port;
                console.log('app listening at ', port);
            });
        }
        else{
            startAppWhenReady();
        }
    }, 500);
}

startAppWhenReady();