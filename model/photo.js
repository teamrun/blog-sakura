var Waterline = require('waterline');

var Photo = Waterline.Collection.extend({
    tableName: 'photo',
    schema: true,
    connection: 'sakuraMongo',
    attributes:{
        id: {
            type: 'string',
            required: true,
            index: true
        },
        ext: {
            type: 'string',
            required: true
        },
        name: {
            type: 'string',
            defaultsTo: '无题'
        },
        _event: {
            type: 'string'
        },
        createDate: {
            type: 'datetime'
        },
        uploadDate: {
            type: 'datetime',
            required: true
        },
        word: {
            type: 'string'
        },
        _private: {
            type: 'boolean'
        },
        exif: {
            type: 'object'
        },
        exifDetail: {
            type: 'object'
        }
    }
});

module.exports = Photo;