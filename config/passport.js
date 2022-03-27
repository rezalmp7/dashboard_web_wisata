const user = require('../models/user')

const LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    userModel = require('../models/user')

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        const user = await userModel.findOne({username})
        if (user == null)
        {
            return done(null, false, {message: "No user with that username"})
        } 

        try {
            if (await bcrypt.compare(password, user.password))
            {
                return done(null, user)
            }
            else {
                return done(null, false, {message: "Passport incorect"})
            }
        } catch (error) {
            return done(error)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => {done(null, user._id)})
    passport.deserializeUser((id, done) => {
        return done(null, userModel.find({id: id}))
    })
}

module.exports = initialize