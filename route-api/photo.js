var fs = require('fs');
var path = require('path');

var Exif = require('exif').ExifImage;
var lwip = require('lwip');
var shortid = require('shortid');
var EventProxy = require('eventproxy');

var config = require('../config');

var DEFAULT_W = 400;

function getExif(file, callback){
    try{
        new Exif({image: file}, callback);
    }
    catch(err){
        callback(err);
    }
}
function resizeImg(file, opt, callback){
    lwip.open(file, function(err, image){
        if(err){
            callback(err);
        }
        else{
            var name = opt.name || file;
            image.batch()
                .resize( DEFAULT_W, image.height()/(image.width()/DEFAULT_W) )
                .writeFile( path.join(opt.dest,name), callback );
        }
    });
}
function copy(src, dest, callback){
    var callbackCalled = false;
    var c = fs.createReadStream(src), v = fs.createWriteStream(dest);
    c.pipe(v);
    function done(){
        ep.emit('copy', true);
    }
    function err(){
        ep.emit('copy', false);
    }
    function done(err){
        if( !callbackCalled ){
            callback(err);
        }
    }
    c.on('error', done);
    v.on('error', done);
    v.on('close', done);
}



function savePhoto(opt, callback){
    // console.log(opt.files);
    // console.log(opt.reqData);
    var tmpFile = opt.files.photo.path;

    /* ALL parallel
     * read exif
     * move to right folder
     * resize
     */
    // THEN save to DB

    var ep = new EventProxy();
    var photoId = shortid.generate();
    var fileExtName = path.extname(tmpFile)
    var newName = photoId + fileExtName;
    ep.all('exif', 'resize', 'copy', function(exif, resizeSuc, copySuc){
        var err = null;
        var data = {
            photoId: photoId
        };
        if(exif === null){

        }
        if( !(resizeSuc && copySuc) ){
            err = { msg: 'gen thumb suc: ' +resizeSuc + ', copy suc:' + copySuc };
            data = undefined;
        }
        callback(err, data);
    });
    // read exif
    getExif(tmpFile, function(err, exifData){
        if(err){
            ep.emit('exif', null);
        }
        else{
            ep.emit('exif', exifData);
        }
    });
    // resize
    resizeImg(tmpFile, {
        dest: config.photo.thumb,
        name: newName
    }, function(err){
        ep.emit('resize', !err);
    });
    // copy
    copy(tmpFile, path.join(config.photo.lib, newName), function(err){
        ep.emit('copy', !err);
    });
}


module.exports = {
    upload: function(req, res, next){
        var opt = {
            files: req.files,
            reqData: req.body
        };
        savePhoto(opt, function(err, data){
            if(err){
                res.send({
                    code: 500,
                    files: opt.files
                });
            }
            else{
                res.send({
                    code: 200,
                    data: data
                });
            }
        });
    }
}