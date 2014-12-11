var React = require('react');

var Summary = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
        
    },
    componentWillUnmount: function() {
        console.time('switch component');
    },
    render: function(){
        return (
            <div>
                <p>Summary</p>
            </div>
        );
    }
});


module.exports = Summary;
