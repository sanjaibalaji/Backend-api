const db = require("../models");
const Departments = require('../models/department')
const Classes = require('../models/class')
const Subjectdetails = require('../models/subject_details')



exports.stafftimetable = async (req, res, next) => {
    const {dayorder} = req.body;
    if (!dayorder) {
        return res.status(400).json({ error: 'Enter the dayorder' });
      }

    const dept_name = await Departments.findOne({ where:{dept_id:"$1"}});
    const section = await Classes.findOne({ where:{class_id:"$1"}});
    const sub_name = await Subjectdetails.findOne({ where:{sub_id:"$1"}});

    

    res.json({dept_name,section,sub_name});
    module.exports = router;

}