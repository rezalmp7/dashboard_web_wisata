const { builtinModules } = require('module'),
    mongoose = require('mongoose')

const province = mongoose.model('provinces', {
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
})

module.exports = province