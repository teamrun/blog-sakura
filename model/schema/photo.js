module.exports = {
    file: {
        type: String,
        required: true
    },
    name: {
        type: String,
        _default: '无题'
    },
    event: {
        type: Object
    },
    exifBase: {
        type: Object
    },
    exifDetail: {
        type: Object
    }
};