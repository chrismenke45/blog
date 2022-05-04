const passport = require('passport');

require('dotenv').config();

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
let UserModel = require('../models/UserModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    /*function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }*/
    function (accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.jwtSecret
  },
  function (jwtPayload, cb) {
  
    //find the user in db 
    return UserModel.findById(jwtPayload.id)
        .then(user => {
            //return cb(null, user);
          if (user.admin) {
            return cb(null, user);
          } else {
            return cb(null)
          }
        })
        .catch(err => {
            return cb(err);
        });
  }
  ));
passport.serializeUser((user, done) => {
    done(null, user)
}
)
passport.deserializeUser((user, done) => {
    done(null, user)
}
)