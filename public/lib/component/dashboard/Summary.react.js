var React = require('react');

var Summary = React.createClass({
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
                <p>Summary</p>
            </div>
        );
    }
});


module.exports = Summary;
