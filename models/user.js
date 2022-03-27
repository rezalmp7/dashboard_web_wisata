const { builtinModules } = require('module'),
    mongoose = require('mongoose')

const user = mongoose.model('user', {
    nama: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true, 
    },
    password: {
        type: String,
        require: true
    },
    level: {
        type: String,
        lowercase: true,
        require: true
    },
    token: {
        type: String,
        default: null,
    },
    create_at: {
        type: Date,
        require: true,
        default: Date.now
    }
})

module.exports = user