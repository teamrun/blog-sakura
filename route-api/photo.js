
function savePhoto(opt, callback){
    callback(null);
}


module.exports = {
    upload: function(req, res, next){
        var opt = {

        };
        savePhoto(opt, function(err, data){
            res.send({code: 200});
        });
    }
}