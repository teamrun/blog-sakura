/* 当前目录其他子文件里包含的是各个model的schema定义
 * 本文件将会进行
 *      1. waterline的初始化
 *      2. 数据库配置
 *      3. model的最终生成和导出
 */

var Waterline = require('waterline');
var sailsMongo = require('sails-mongo');

var orm = new Waterline();

var Photo = require('./photo');

var config = {
    adapters: {
        mongo: sailsMongo
    },
    connections: {
        sakuraMongo: {
            adapter: 'mongo',
            host: 'localhost',
            database: 'blog-sakura'
        }
    }
};

orm.loadCollection(Photo);

var models = {};

orm.initialize(config, function(err, _models){
    if(err){
        throw err;
        return;
    }
    models = _models.collections;
});

module.exports = function(){
    return models;
};