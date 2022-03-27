const express = require('express'),
    user_model = require('../models/user'),
    route = express.Router(),
    bcrypt = require('bcrypt'),
    { body, validationResult } = require('express-validator');

route
    .get('/', async (req, res) => {
        const users = await user_model.find()

        res.render('user', {
            layout: 'layouts',
            users,
            msg: req.flash('msg')
        })
    })
    .get('/add', (req, res) => {
        res.render('userAdd', {
            layout: 'layouts',
            error: null
        })
    })
    .get('/edit/:id', async (req, res) => {
        const user = await user_model.findById(req.params.id)

        res.render('userEdit', {
            layout: 'layouts',
            user,
            error: req.flash('msg')
        })
    })
    .post('/add',
        body("username").custom(async value => {
            const checkUsername = await user_model.find({username:value})
            console.log(checkUsername);
            if(checkUsername == null)
            {
                throw new Error("Username Sudah Terpakai")
            }
            return true
        }),
        (req, res) => {
            // console.log(req);
            const error = validationResult(req)

            if(!error.isEmpty()) {
                res.render('userAdd', {
                    layout: 'layouts',
                    error: error.array()
                })
            }
            else {
                const tambahUser = new user_model({
                    nama: req.body.nama,
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 10),
                    level: req.body.level
                })

                tambahUser.save()
                    .then(() => {
                        req.flash('msg', "User Berhasil ditambahkan")

                        res.redirect('/user')
                    })
                    .catch(e => {
                        req.flash('msg', { type: "danger", title: "Failed", msg: 'User gagal ditambahkan'})

                        res.redirect('/user/add')
                    })
            }
        }
    )
    .put('/',
        body("username").custom( async (value, {req}) => {
            const checkUsername = await user_model.find({username: value})

            if(value != req.body.username_lama)
            {
                if(checkUsername == null) {
                    throw new Error('Username Sudah Terpakai')
                }
                return true
            }
            else {
                return true
            }
        }),
        (req, res) => {
            const error = validationResult(req)
            let password = null;

            if(!error.isEmpty()) {
                req.flash('msg', {type: "warning", title: "Failde", msg: error.array()})
                res.redirect('user/edit/'+req.body.id)
            }
            else
            {
                if(req.body.password == null)
                {
                    password = req.body.password_lama
                }
                else {
                    password = bcrypt.hashSync(req.body.password, 10)
                }

                user_model.findOneAndUpdate({_id: req.body.id}, {
                    nama: req.body.nama,
                    username: req.body.username,
                    password,
                    level: req.body.level
                })
                .then(() => {
                    req.flash('msg', {type: "success", title: "Success", msg: "Username Berhasil ditambahakan"})
                    res.redirect('/user')
                })
            }
        }
    )
    .delete('/', (req, res) => {
        const id = req.body.id

        user_model.deleteOne({_id: id})
            .then(() => {
                req.flash('msg', { type: "success", title: "Success", msg: "Username Berhasil dihapus" })
                res.redirect('/user')
            })
            .catch(e => {
                req.flash('msg', { type: "success", title: "Success", msg: "Username Gagal dihapus error:"+e })
                res.redirect('/user')
            })
    })


module.exports = route