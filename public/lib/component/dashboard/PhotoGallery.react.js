var React = require('react');

var PhotoGallery = React.createClass({
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
        return <div>PhotoGallery</div>;
    }
});


module.exports = PhotoGallery;
