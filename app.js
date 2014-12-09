var appGen = require('korrect');
var pageRoutes = require('./route-page');

var app = appGen({
    config: require('./config'),
    views: __dirname + '/views',
    model: __dirname + '/model',
    assets: __dirname + '/public'
});




app.get('/', pageRoutes.index);


app.get('/dashboard/signin', function* (){
    this.body = 'signin';
});
app.get('/dashboard/signup', function* (){
    this.body = 'signup';
});
// 除signin 和 signup
// 正则写不好, 先放在后面吧
app.get(/^\/dashboard/i, pageRoutes.dashboard );



var port = 3006;
app.listen(3006, function(){
    console.log('blog app is listening at [', port, ']');
});