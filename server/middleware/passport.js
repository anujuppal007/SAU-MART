const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const config = require('../config/config');
const userController = require('../controllers/user.controller');

const LocalLogin = new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        const user = userController.getUserByEmailIdAndPassword(email, passport);
        return user
        ?done(null, user)
        :done(null, false, {
            error: 'Your login details are not valid. Please try again'
        });
    }
)


const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
    },
    async(paylolad, done) => {
        const user = await userController.getUserById(paylolad._id)
        return user
        ?done(null, user)
        :done(null, false, {
            error: 'Your login details are not valid. Please try again'
        });
    }
)

module.exports = passport.use(LocalLogin).use(jwtLogin);