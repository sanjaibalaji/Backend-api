const db = require("../models");
const Deptsubdetails = db.dept_sub_details;
const subjectDetails = db.subject_details

exports.deptsubdetails = async (req, res, next) => {
    const {dept_id,sub_id,year,batch} = req.body;
    if (!dept_id) {
        return res.status(400).json({ error: 'Enter the dept id' });
      }
      if(!sub_id) {
        return res.status(400).json({ error: 'Enter the sub_id' });
      }
      if(!year) {
        return res.status(400).json({ error: 'Enter the year' });
      }
      if(!batch) {
        return res.status(400).json({ error: 'Enter the batch' });
      }
      const deptsubdetails = {
        dept_id: req.body.dept_id,
        sub_id:req.body.sub_id,
        year: req.body.year,
        batch:req.body.batch
      }
  
      const result = await Deptsubdetails.create(deptsubdetails)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}

exports.deptsubjectlist = async(req,res,next) => {
  const dept_code = req.query.dept_code;
  // console.log(user_id)
  try {
    const users = await Deptsubdetails.findAll(
      {where:{dept_code},
      attributes: ['id'],
      include: [{
        model: subjectDetails,
        attributes: ['sub_code','sub_name',],
      }],
    },
    );
    res.json({ data: users })
  } catch (error) {
    console.log(error)
  }
}
