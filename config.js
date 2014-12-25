var path = require('path');
var fse = require('fs-extra');

var HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var photoLib = path.resolve(HOME, 'picture/blog-sakura');

var conf = {
    db: {
        url: 'localhost/blog-sakura'
    },
    uploadTmp: path.resolve('./.uploadTmp'),
    photo: {
        lib: photoLib,
        thumb: path.join(photoLib, 'thumb'),
        thumb_2x: path.join(photoLib, 'thumb_2x')
    }
};

var needed = ['uploadTmp', 'photo.lib', 'photo.thumb', 'photo.thumb_2x'];


function objAccess(obj, key){
    if(key.indexOf('.') < 0){
        return obj[key];
    }
    else{
        var arr = key.split('.');
        var t = arr[0];
        var leftKey = arr.slice(1).join('.');
        return objAccess(obj[t], leftKey );
    }
}

needed.forEach(function(p){
    fse.mkdirpSync( objAccess(conf,p) );
});

module.exports = conf;