module.exports = function(app){
    // require放在函数执行时, 这个函数会在async exports完成之后执行
    var apiRoute = require('../route-api');
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
}