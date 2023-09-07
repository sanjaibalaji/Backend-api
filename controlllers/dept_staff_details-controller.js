const db = require("../models");
const dept_staff_details = require("../models/dept_staff_details");
const { register } = require("./register-controller");
const DeptStaff = db.dept_staff_details;
const Register = db.register;
const staffSubDetails = db.staff_sub_details
const subjectDetails = db.subject_details


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

exports.deptstafflist = async (req, res, next) => {
  const dept_id = req.query.dept_id;
  try {
    const users = await DeptStaff.findAll({
      where: { dept_id: dept_id },
      attributes: ['user_id'],
      include: [
        {
          model: Register,
          attributes: ['user_id', 'firstName', 'lastName'],
        },
      ],
    });
    const usersWithSubDetails = [];
    for (const user of users) {
      const subDetails = await staffSubDetails.findAll({
        where: { user_id: user.user_id },
        attributes: ['user_id'],
        include: [
          {
            model: subjectDetails,
            attributes: ['sub_name'],
          },
        ],
      });
      usersWithSubDetails.push({
        user_id: user.user_id,
        register: {
          user_id: user.register.user_id,
          firstName: user.register.firstName,
          lastName: user.register.lastName,
          sub_name: [subDetails.map((subDetail) => subDetail.subject_detail.sub_name).join(', ')]
    }
  });
    }
    res.json({ data: { users: usersWithSubDetails } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};