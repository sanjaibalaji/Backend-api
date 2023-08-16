const db = require("../models");
const dept_staff_details = require("../models/dept_staff_details");
const { register } = require("./register-controller");
const DeptStaff = db.dept_staff_details;
const Register = db.register;


exports.deptStaff = async (req, res, next) => {
    const {dept_id,user_id} = req.body;
    if (!dept_id) {
        return res.status(400).json({ error: 'Enter the dept id' });
      }
      if(!user_id) {
        return res.status(400).json({ error: 'Enter the staff id' });
      }
      const deptstaff = {
        dept_id: req.body.dept_id,
        user_id:req.body.user_id,
      }
  
      const result = await DeptStaff.create(deptstaff)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}

exports.deptstafflist = async(req,res,next) => {
  const dept_id = req.query.dept_id;
  console.log(dept_id)
  try {
    const users = await DeptStaff.findAll(
      {where:{dept_id:dept_id},
      attributes: ['user_id'],
      include: [{
        model: Register,
        attributes: ['user_id','firstName','lastName'],
      }],

    },

    );
    res.json({ data: users })
  } catch (error) {
    console.log(error)
  }

}
