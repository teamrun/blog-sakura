var setup = require('./setup');
var useMiddleware = require('./useMiddleware');

var pageRoutes = require('./pageRoutes');
var apiRoutes = require('./apiRoutes');

module.exports = {
    setup: setup,
    useMiddleware: useMiddleware,
    pageRoutes: pageRoutes,
    apiRoutes: apiRoutes
};