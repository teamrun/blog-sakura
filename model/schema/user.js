module.exports = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: 'email',
        required: true
    },
    alias: {
        type: String
    },
    cover: {
        type: String
    },
    saying: {
        type: String
    }
};