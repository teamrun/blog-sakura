var fs = require('fs');
var path = require('path');

var BASE_PATH = path.resolve(__dirname, 'public/lib/component');
var reactCmtFunc = function(){
/*var React = require('react');

var $1 = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
        
    },
    componentWillUnmount: function() {
        
    },
    render: function(){
        return <div>$1</div>;
    }
});


module.exports = $1;
*/};

var REACT_COM_STR = commentTmpl(reactCmtFunc);


var comArr = getComNames( process.argv[2] );
var destPath = path.resolve( BASE_PATH,  process.argv[3]||'');

// console.log(comName, destPath);

comArr.forEach(function(comName){
    var comStr = REACT_COM_STR.replace(/\$1/g, comName);
    var fileName = path.resolve(destPath, comName + '.react.js');
    fs.writeFile( fileName, comStr, function(err){
        if(err){
            console.log('err: ', err);
        }
        console.log('generate react component ', comName, ' done');
    } );
});





function getComNames(comNameArg){
    var argArr = comNameArg.split(/,\ {0,}/).map(function(a){
        return a.substr(0,1).toUpperCase() + a.substr(1);
    });
    return argArr;
}

function commentTmpl(fn) {
    var reg = /\/\*([\s\S]*)\*\//g
    var match = reg.exec(fn.toString());
    if(match) {
        return match[1];
    }
    return '';
}