const { builtinModules } = require('module'),
    mongoose = require('mongoose')

const regency = mongoose.model('regencies', {
    id: {
        type: String,
        require: true
    },
    province_id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = regency