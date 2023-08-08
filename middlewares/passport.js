
const passport =require('passport');
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");
const Register = db.register;
const User = require("../models/register");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
// const { SECRET } = require("../config");
const SECRET =  "sjakfdhhhhhhhsahfaskhfkashfkashfnhhhhhkaskk" 
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


const GoogleStrategy = require('passport-google-oauth2').Strategy;
  
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
  
passport.use(new GoogleStrategy({
    clientID:"870696435915-k6827g0o4ol7n1r647oq1qtcibspbu0p.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"http://localhost:8080/auth/callback",
    passReqToCallback:true
  },
  async (accessToken,refreshToken,profile,done) => {
    try {
      const user = await Register.findOne({ email: profile.emails[0].value });
      // const {id,displayName,emails} = profile;
      req.user = { // Include other user profile data if needed
        token: "akjshsakfdshjsha", // Replace 'token' with the variable that holds the JWT token
      };
      // const email = emails[0].value;
      // const [user] = await Register.findOne({where:{email}});

      done(req.user);
    console.log("sanjai", +req.user)
      if (user) {
        // If the user exists, return the user
        let token = jwt.sign(
            {
              user_id: user.user_id,
              role: user.role_name,
              email: user.email
            },
            SECRET,
            { expiresIn: "7 days" }
      );
      // req.user.token = "askjdjsad"
          let result = { 
            user_id:  user.user_id, 
            role: user.role_name,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
          };
          console.log(req.user);
        done(null,req.user);
    }
  } catch (error){
      done(error,null);
    }
  }
));
  
