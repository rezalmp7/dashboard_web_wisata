const { builtinModules } = require('module'),
    mongoose = require('mongoose')

const district = mongoose.model('districts', {
    id: {
        type: String,
        require: true,
    },
    regency_id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = district