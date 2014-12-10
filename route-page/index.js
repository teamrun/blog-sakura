var React = require('react');
var nodeJSX = require('node-jsx').install();
var Router = require('react-router');


var index = function* pageIndex(){
    this.body = yield kRender('index', {});
};



/*
 * Can i use pure ReactJS coms to build the dashboard?
 *
 * still have problem
 *
 * How to load different js files: write in render's local varible??
 * How to solve server render and client render 's different data problem?
 */


/* -------------------- isomorphic app -------------------- */

// var dashboard = function* pageDashboard(){
//     var dashboardModulePath = '../public/lib/dashboard';
//     var Dashboard = require(dashboardModulePath);

    
//     var appData = {
//         foo: 'bar'
//     };

//     // 路由handler中不能用callback了?
//     // 直接用yield + thunk了
//     // 注意thunk是 只接受callback的函数
//     //      且callback接受到的结果, 第一个会被作为是err

//     //var result = yield (function(){
//     //    return function(cb){
//     //        setTimeout(function(){
//     //            cb(null, 22);
//     //        }, 200);
//     //    }
//     //})();

//     var result = yield (function(){
//         return function(cb){
//             Router.run(Dashboard, function(Handler, state){
//                 cb(null, [Handler, state]);
//             });
//         }
//     })();


//     //console.log('dev', result);
//     var Handler = result[0];
//     //this.body = '3333';
//     this.body = yield kRender('dashboard', {
//         title: 'dashboard',
//         appContent: React.renderToString(Handler())
//     });
//     // 哈哈 每次都un require, 然后在路由开始的时候重新require进来
//     // use resolve to get abs path
//     delete require.cache[require.resolve(dashboardModulePath)];
// };

/* -----------------  endof isomorphic app ----------------- */

var dashboard = function* pageDashboard(){
    var locale = {
        title: 'Dashboard 控制台'
    };

    this.body = yield kRender('dashboard', locale);
}




/* -------------------- sign in and sign up -------------------- */
//app.get('/dashboard/signin', function *(){
//    this.body = yield render('dashboard', {
//        title: 'SignIn render to string and fill in'
//    });
//});
//app.get('/dashboard/signup', function *(){
//    this.body = yield render('dashboard', {
//        title: 'SignUp render to string and fill in'
//    });
//})
/* ---------------- endof sign in and sign up ----------------- */


module.exports = {
    index: index,
    dashboard: dashboard
};