const db = require("../models");
const Timetable=db.timetable
const Department=db.department
const Batch=db.batch_details
const Classes = db.classes;
const Subject = db.subject_details
const Register = db.register

exports.stafftimetable = async(req,res,next) => {
    const {user_id} = req.query;
    const result = await Timetable.findAll({where:{user_id:user_id}})
    if (result) {
  const stafftimetable = await Timetable.findAll({
            where: { user_id: user_id},
            include: [
              {
                model: Department,
                attributes: ['dept_name'],
              },
              {
                model: Batch,
                attributes: ['batch'],
              },
              {
                model: Classes,
                attributes: ['section'],
              },
              {
                model: Subject,
                attributes: ['sub_name'],
              },
            ],
          });
              return res.status(200).json({data:stafftimetable}) 
            } else {
                return res.status(400).json({message:"error"})
            }
}


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
              as: 'department', // Use the alias defined in the model
            },
            {
              model: Batch,
              attributes: ['batch'],
              as: 'batch_details', // Use the alias defined in the model
            },
            {
              model: Classes,
              attributes: ['section'],
              as: 'classes', // Use the alias defined in the model
            },
            {
              model: Subject,
              attributes: ['sub_name'],
              as: 'subject_detail', // Use the alias defined in the model
            },
            {
             model: Register,
             attributes: ['firstName']
            },
          ],
        });
            return res.status(200).json({data:stafftimetable}) 
          } else {
              return res.status(400).json({message:"error"})
          }
}


