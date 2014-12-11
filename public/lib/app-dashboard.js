var React = require('react');

var route = {
    '': 'Summary',
    'write': 'Editor',
    "postlist": 'PostList',
    'photogallery': 'PhotoGallery',
    'photoupload': 'PhotoUpload'
};


// for(var c in coms){
//     coms[c] = require('./component/dashboard/'+c+'.react');
// }
// browserify 毕竟只是个静态打包工具, 不能解析上面的动态require
var coms = {
    'Summary': require('./component/dashboard/Summary.react'),
    'Editor': require('./component/dashboard/Editor.react'),
    'PostList': require('./component/dashboard/PostList.react'),
    'PhotoGallery': require('./component/dashboard/PhotoGallery.react'),
    'PhotoUpload': require('./component/dashboard/PhotoUpload.react')
};



var Dashboard = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        this.setState({
            path: this.props.path || ''
        });
    },
    render: function(){
        var Component = null;
        var path = this.state.path || 'Summary';
        Component = coms[path];
        var navItems = [];
        for(var i in coms){
            navItems.push(
                <li className={i} key={i}>
                    <a href="#" data-path={i} onClick={this.switchRoute}>{i}</a>
                </li>
            );
        }
        return (
            <div style={{height: '100%'}}>
                <ul>{navItems}</ul>
                <Component />
            </div>
        );
    },
    switchRoute: function(e){
        var newPath = e.target.dataset.path;
        this.setState({
            path: newPath
        });
        e.preventDefault();
    }
});

React.render(<Dashboard path=""/>, document.querySelector('#ctn'));