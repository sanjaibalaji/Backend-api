const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport")
const cors = require("cors");
const cookieSession = require('cookie-session');
const route = require('./routes/routes');
const db = require("./models");
const app = express();
var passports = require ('./middlewares/passport')
 

   app.use(cors({
   origin: '*'
}));

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);
app.use('/', route)

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
// simple route
app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}.` });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


