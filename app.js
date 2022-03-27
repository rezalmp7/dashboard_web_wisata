if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express'),
    expressLayout = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('express-flash'),
    passport = require('passport'),
    user = require('./controllers/user'),
    login = require('./controllers/login'),
    wisata = require('./controllers/wisata')

require('./utils/db')

const initializePassport = require('./config/passport')
initializePassport(passport)

const app = express(),
    port = 3000

app.listen(port, () => {
    console.log("Dashboard Wisata is running | open with http://localhost:" + port)
})

app.use(express.json())
app.use(express.urlencoded( {extended: false} ))
app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(flash())
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            expired: 6000
        }
    })
);

app.use(passport.initialize())
app.use(passport.session())

app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.render('dashboard', {
        layout: 'layouts'
    })
})

app.use('/user', user)
app.use('/wisata', wisata)
app.use('/login', login)

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated())
    {
        return res.redirect('/dashboard')
    }
    next()
}