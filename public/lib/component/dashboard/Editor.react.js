var React = require('react');

var Editor = React.createClass({
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
        // 从summary切换到editor  耗时
        //      min    7ms      一个div =>  一个div
        //      middle 14ms     一个div =>  200+div
        //      max    31ms     300 div =>  300div
        console.timeEnd('switch component');
    },
    componentWillUnmount: function() {
        
    },
    render: function(){
        return (
            <div>
                <p>Editor</p>
            </div>
        );
    }
});


module.exports = Editor;
