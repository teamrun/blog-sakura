var React = require('react/lib/ReactWithAddons');
var util = require('./util');

var cx = React.addons.classSet;

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
    '/Summary': require('./component/dashboard/Summary.react'),
    '/Editor': require('./component/dashboard/Editor.react'),
    '/PostList': require('./component/dashboard/PostList.react'),
    '/PhotoGallery': require('./component/dashboard/PhotoGallery.react'),
    '/PhotoUpload': require('./component/dashboard/PhotoUpload.react')
};

var defaultRoute = '/Summary';


var Dashboard = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        this.setState({
            path: this.props.path || ''
        });
        // 路由 绑定popstate 做响应
        this.bindPopState();
    },
    render: function(){
        var Component = null;
        // 路由 默认路由
        var path = this.state.path || defaultRoute;
        Component = coms[path];
        var navItems = [];
        for(var i in coms){
            // 路由 当前激活
            var classes = cx({
                'nav-item': true,
                active: (i == path)
            });
            navItems.push(
                <li className={classes} key={i}>
                    <a href="#" data-path={i} onClick={this.switchRoute}>{i.substr(1)}</a>
                </li>
            );
        }
        return (
            <div  style={{height: '100%'}}>
                <header>
                    <nav>
                        <ul className="nav-list">{navItems}</ul>
                    </nav>
                </header>
                <div className="main">
                    <Component />
                </div>
            </div>
        );
    },
    // 路由 切换路由    
    switchRoute: function(e){
        var newPath = e.target.dataset.path;
        this.setState({
            path: newPath
        });
        window.history.pushState({}, 'xxx', baseRoutePath + newPath );
        e.preventDefault();
    },
    bindPopState: function(){
        var self  = this;
        window.addEventListener('popstate', function(e){
            var newPath = location.pathname.substr(baseRoutePath.length);
            self.setState({
                path: newPath
            });
        });
    }
});

var baseRoutePath = '/dashboard';

if( !util.isNodeEnv() ){
    var pathname = window.location.pathname;
    // 路由 页面初始化, baseRoutePath
    var curPath = pathname.substr( baseRoutePath.length );
    React.render(<Dashboard path={curPath}/>, document.querySelector('body'));
}

