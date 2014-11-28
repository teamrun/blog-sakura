var appGen = require('korrect');

var app = appGen({
    views: __dirname + '/views',
    model: __dirname + '/model',
    assets: __dirname + '/public'
});

app.get('/', function *(){
   this.body = yield render('index', {});
});


var port = 3006;
app.listen(3006, function(){
    console.log('blog app is listening at [', port, ']');
});