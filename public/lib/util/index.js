module.exports = {
    isNodeEnv: function(){
        try{
            return (Object.prototype.toString.call(global.process) === '[object process]' );
        }
        catch(err){
            return false;
        }
    }
};