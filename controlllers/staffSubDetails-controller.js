const db = require("../models");
const Staffsubdetails = db.staffsubdetails;

exports.staffsubdetails = async (req, res, next) => {
    const {staff_id,sub_id} = req.body;
    if (!staff_id) {
        return res.status(400).json({ error: 'Enter the staff id' });
      }
      if(!sub_id) {
        return res.status(400).json({ error: 'Enter the sub_id' });
      }
     
      const staffsubdetails = {
        staff_id: req.body.staff_id,
        sub_id:req.body.sub_id
      }
  
      const result = await Staffsubdetails.create(staffsubdetails)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}