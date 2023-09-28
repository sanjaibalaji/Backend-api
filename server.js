const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require("cors");
const session = require('express-session');
const route = require('./routes/routes');
const db = require("./models");
const app = express();

var passports = require ('./middlewares/passport')

   app.use(cors({
   origin: '*'
}));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
passport.use(
  new GoogleStrategy(
    {
      clientID:"870696435915-8nd83qijctf9mti285hhtpfdjkrp7u9j.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL: 'https://odooformybusiness.com/auth/callback', 
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use(route);
app.use('/', route)
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log(err)
    console.log("Failed to sync db: " + err.message);
  });
app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}.` });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});