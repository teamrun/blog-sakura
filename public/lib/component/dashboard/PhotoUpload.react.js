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
                <input type="text" ref="photo-name" name="photo-name" />
                <a id="submit-photo" href="" onClick={this._submitPhoto}>上传</a>
            </div>
        );
    },
    _submitPhoto: function(e){
        e.preventDefault();
        var form = new FormData();
        var fileInput = this.refs['upload-photo'].getDOMNode();
        var nameInput = this.refs['photo-name'].getDOMNode();
        form.append('photo', fileInput.files[0]);
        form.append('name', nameInput.value);
        util.xhrForm( '/api/photo',form, function(xhr){
            console.log(xhr.status);
            console.log( JSON.parse(xhr.responseText) );
        });
    }
});


module.exports = PhotoUpload;
