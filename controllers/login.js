const express = require('express'),
    user_model = require('../models/user'),
    route = express.Router(),
    bcrypt = require('bcrypt'),
    { body, validationResult } = require('express-validator'),
    passport = require('passport')

route
    .get('/', (req, res) => {
        res.render('login', {
            layout: 'layoutLogin',
            msg: req.flash('msg'),
            error: null
        })
    })
    .post('/', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }))

module.exports = route