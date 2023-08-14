
const passport =require('passport');
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../models");
const Register = db.register;
const User = require("../models/register");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET =  "sjakfdhhhhhhhsahfaskhfkashfkashfnhhhhhkaskk" 

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
    clientID:"870696435915-8nd83qijctf9mti285hhtpfdjkrp7u9j.apps.googleusercontent.com", 
    clientSecret:"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", 
    callbackURL:"https://odooformybusiness.com/auth/callback",
    passReqToCallback:true
  },
  async (accessToken,refreshToken,profile,done) => {
    try {
      const user = await Register.findOne({ email: profile.emails[0].value });
      
      req.user = {
        token: "akjshsakfdshjsha", 
      };
     

      done(req.user);
    console.log("sanjai", +req.user)
      if (user) {
      
        let token = jwt.sign(
            {
              user_id: user.user_id,
              role: user.role_name,
              email: user.email
            },
            SECRET,
            { expiresIn: "7 days" }
      );
      
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
  
