var React = require('react');
var util = require('../../util');

var PhotoUpload = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
        console.timeEnd('switch component');
    },
    componentWillUnmount: function() {
        console.time('switch component');
    },
    render: function(){
        return (
            <div>
                <p>PhotoUpload</p>
                <input type="file" ref="upload-photo" name="upload-photo" accept="image/*" />
                <a id="submit-photo" href="" onClick={this._submitPhoto}>上传</a>
            </div>
        );
    },
    _submitPhoto: function(e){
        e.preventDefault();
        var form = new FormData();
        var fileInput = this.refs['upload-photo'].getDOMNode();
        form.append('photo', fileInput.files[0]);
        util.xhrForm( '/api/photo',form, function(xhr){
            console.log(xhr.status);
            console.log( JSON.parse(xhr.responseText) );
        });
    }
});


module.exports = PhotoUpload;
