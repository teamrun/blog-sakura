module.exports = {
    isNodeEnv: function(){
        try{
            return (Object.prototype.toString.call(global.process) === '[object process]' );
        }
        catch(err){
            return false;
        }
    },
    xhrForm: function(url, data, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
//         xhr.upload.onprogress = function (event) {
//             if (event.lengthComputable) {
//                 var complete = (event.loaded / event.total * 100 | 0);
//                 _view.updateUploadProgress( complete );
//             }
//         };
        xhr.onreadystatechange = function(){
            if( xhr.readyState === 4 ){
                callback( xhr );
            }
        };
        xhr.send( data );
    }
};