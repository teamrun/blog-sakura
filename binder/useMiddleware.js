var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var serve = require('serve-static');

var config = require('../config');

module.exports = function(app){
    app.use(logger('dev'));
    app.use(serve(config.appPath + '/public'));
    // app.use(bodyParser());
    app.use(multer({ dest: config.uploadTmp }));
}