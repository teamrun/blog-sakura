var path = require('path');
var fse = require('fs-extra');

var conf = {
    db: {
        url: 'localhost/blog-sakura'
    },
    uploadTmp: path.resolve('./.uploadTmp')
};

var needed = ['uploadTmp'];

needed.forEach(function(p){
    fse.mkdirpSync(conf[p]);
});

module.exports = conf;