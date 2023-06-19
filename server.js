const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const route = require('./routes/routes')
const db = require("./models");
const app = express();
 

   app.use(cors({
   origin: '*'
}));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
require("./middlewares/passport")(passport);
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


