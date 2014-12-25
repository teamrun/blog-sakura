var pageRoute = require('../route-page');

module.exports = function(app){
    app.get('/', pageRoute.index);
    app.get('/dashboard/signin', pageRoute.dashboardSignIn);
    app.get('/dashboard/signup', pageRoute.dashboardSignUp);
    app.get(/\/dashboard(\/.+)?/, pageRoute.dashboard);
};