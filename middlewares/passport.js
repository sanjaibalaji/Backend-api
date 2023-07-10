
const passport =require('passport');
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");
const Register = db.register;
const User = require("../models/register");
const bcrypt = require('bcrypt')
const { SECRET } = require("../config");
// import config from './config';
// import { db } from './models';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
  };


module.exports = passport => {
    passport.use('jwt',
      new Strategy(opts, async (payload, done) => {
        console.log(payload)
    await Register.findOne({where: {email:payload.email}})
       .then(user => {
        console.log(user)
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
         
      })
    );

  };

  // const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
  
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
<<<<<<< HEAD
    clientID:"870696435915-ijo997toq8hiqik18a5hv26n8tst904u.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"https://odooformybusiness.com/auth/callback",
=======
    clientID:"870696435915-kof0b6np2leg70u3prn3j9uoqba0npgn.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"http://localhost:8080/auth/callback",
>>>>>>> origin/master
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile) {
    return (null, profile);
  }
));
  
