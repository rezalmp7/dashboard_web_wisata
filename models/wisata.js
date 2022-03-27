const { builtinModules } = require('module'),
    mongoose = require('mongoose')

const wisata = mongoose.model('wisata', {
    nama: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
    },
    province: {
        type: Number,
        require: true
    },
    regency: {
        type: Number,
        require: true
    },
    district: {
        type: Number,
        require: true
    },
    village: {
        type: Number,
        require: true
    },
    lat: {
        type: Number,
        default: null
    },
    lng: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        require: true,
    },
    create_at: {
        type: Date,
        require: true,
        default: Date.now
    }
})

module.exports = wisata