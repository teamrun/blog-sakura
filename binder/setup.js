var config = require('../config');


module.exports = function(app){
    app.set('views', config.appPath + '/views');
    app.set('view engine', 'jade');
};