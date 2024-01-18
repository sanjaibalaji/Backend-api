const db = require("../models");
const Venue = db.Venue;

exports.venue = async (req, res, next) => {
    const {venue} = req.body;
      if(!venue) {
        return res.status(400).json({ error: 'Enter the venue' });
      }
      const venues = {
        venue:req.body.venue,
      }
      const result = await Venue.create(venues)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}

exports.venuelist = async (req,res,next) => {
  const result = await Venue.findAll()
if (result) {
       return res.status(200).json({ venue: result });
     }
     else {
       return res.status(400).json({ error: "error" });
     }
}
