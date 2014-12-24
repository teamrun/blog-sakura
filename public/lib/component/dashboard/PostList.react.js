var React = require('react');

var PostList = React.createClass({
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
        return <div>PostList</div>;
    }
});


module.exports = PostList;
