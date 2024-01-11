const db = require("../models");
const Staffsubdetails = db.staff_sub_details;
const subjectDetails = db.subject_details

exports.staffsubdetails = async (req, res, next) => {
    const {user_id,sub_code} = req.body;
    if (!user_id) {
        return res.status(400).json({ error: 'Enter the staff id' });
      }
      if(!sub_code) {
        return res.status(400).json({ error: 'Enter the sub_id' });
      }
      const staffsubdetails = {
        user_id: req.body.user_id,
        sub_code:req.body.sub_code
      }
      const result = await Staffsubdetails.create(staffsubdetails)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}

exports.staffsubjectlist = async(req,res,next) => {
  const user_id = req.query.user_id;
  console.log(user_id)
  try {
    const users = await Staffsubdetails.findAll(
      {where:{user_id:user_id},
      attributes: ['user_id'],
      include: [{
        model: subjectDetails,
        attributes: ['sub_code','sub_name','color_code','color_name'],
      }],
    },
    );
    res.json({ data: users })
  } catch (error) {
    console.log(error)
  }
}
