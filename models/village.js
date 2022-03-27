const { builtinModules } = require('module'),
    mongoose = require('mongoose')

const village = mongoose.model('villages', {
    id: {
        type: String,
        require: true,
    },
    district_id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = village