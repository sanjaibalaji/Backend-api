const db = require("../models");
const timetable = require("../models/timetable");
const Timetable=db.timetable
const Department=db.department
const Batch=db.batch_details
const Classes = db.classes;
const Subject = db.subject_details
const Register = db.register


exports.stafftimetable = async (req, res, next) => {
  const { user_id } = req.query;
  try {
      const stafftimetable = await Timetable.findAll({
          attributes: ['user_id', 'id', 'dayorder', 'period_no'],
          where: { user_id: user_id },
          include: [
              {
                  model: Department,
                  attributes: ['dept_name','dept_code'],
              },
              {
                  model: Batch,
                  attributes: ['batch', 'year'],
              },
              {
                  model: Classes,
                  attributes: ['section'],
              },
              {
                  model: Subject,
                  attributes: [ 'sub_code','sub_name', 'color_code', 'color_name']
                  
              },
          ],
      });
      console.log(stafftimetable)
      const organizedData = {
        user_id: user_id,
        department: stafftimetable.length > 0 ? stafftimetable[0].department.dept_name : null,
        details: {},
      };
      const uniqueSubjectDetails = Array.from(
        new Set(stafftimetable.map(record => JSON.stringify(record.subject_detail)))
      ).map(item => JSON.parse(item));
      stafftimetable.forEach(record => {
        const dayorderKey = `dayorder:${record.dayorder}`; 
        if (!organizedData.details[dayorderKey]) {
          organizedData.details[dayorderKey] = [];
        }
        organizedData.details[dayorderKey].push({
              id: record.id,
              dayorder: record.dayorder,
              period_no: record.period_no,
              department: record.department.dept_name,
        batch: stafftimetable.length > 0 ? stafftimetable[0].batch_detail.batch : null,
        year: stafftimetable.length > 0 ? stafftimetable[0].batch_detail.year : null,
        subjectDetails: {
            sub_code: record.subject_detail ? record.subject_detail.sub_code : "null",
            sub_name: record.subject_detail ? record.subject_detail.sub_name : "null",
            color_code: record.subject_detail ? record.subject_detail.color_code : "null",
            color_name: record.subject_detail ? record.subject_detail.color_name : "null",
        },
          })
        })
      return res.status(200).json({ data: organizedData });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
};
exports.allstafftimetable = async(req,res,next) => {
  const {dept_id,batch_id,class_code} = req.query;
  const result = await Timetable.findAll({where:{dept_id:dept_id,batch_id:batch_id,class_code:class_code}})
  if (result) {
const stafftimetable = await Timetable.findAll({
          where: { dept_id:dept_id,batch_id:batch_id,class_code:class_code},
          include: [
            {
              model: Department,
              attributes: ['dept_name'],
              required : true
            },
            {
              model: Batch,
              attributes: ['batch'],
              required : true
            },
            {
              model: Classes,
              attributes: ['section'],
              require : true
            },
            {
              model: Subject,
              attributes: ['sub_name'],
              required : true
            },
            {
             model: Register,
             attributes: ['firstName'],
             required : true
            },
          ],
        });
        const filteredData = stafftimetable.filter(entry => entry.department!== null);
            return res.status(200).json({data:filteredData}) 
          } else {
              return res.status(400).json({message:"error"})
          }
}


