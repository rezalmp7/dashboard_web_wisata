const regency = require('../models/regency')

const express = require('express'),
    wisata_model = require('../models/wisata'),
    province_model = require('../models/province'),
    district_model = require('../models/district'),
    regency_model = require('../models/regency'),
    village_model = require('../models/village'),
    route = express.Router(),
    { body, validationResult, Result } = require('express-validator')

route
    .get('/', async(req, res) => {
        const wisatas = await wisata_model.find()
        
        res.render('wisata', {
            layout: 'layouts',
            wisatas,
            msg: req.flash('msg')
        })
    })
    .get('/add', async (req, res) => {
        let provinces = await province_model.find()

        const alamat = {
            provinces
        }

        res.render('wisataAdd', {
            layout: 'layouts',
            msg: req.flash('msg'),
            alamat,
            error: null
        })
    })
    .post('/get_many_regencies', async (req, res) => {
        let regencies = await regency_model.find({ province_id: req.body.id_province })
        res.send(regencies);
    })
    .post('/get_many_district', async (req, res) => {
        let district = await district_model.find({ regency_id: req.body.id_regency })
        res.send(district)
    })
    .post('/get_many_village', async (req, res) => {
        let district = await village_model.find({ district_id: req.body.id_district })
        res.send(district)
    })

module.exports = route