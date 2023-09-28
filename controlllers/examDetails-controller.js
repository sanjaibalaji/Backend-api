const db = require("../models");
const ExamDetails = db.exam_details;

exports.examtypes = async (req,res,next) => {
    const exam_type = req.body.exam_type;
    if(!exam_type) {
        return res.status(400).json({ error: 'Enter the Exam Types' });
      }
      const exams = {
        // role_id: req.body.role_id,
        exam_type:req.body.exam_type,
      }
      const result = await ExamDetails.create(exams)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}

exports.getexamtypes = async(req,res,next) => {
    const examtypes = await ExamDetails.findAll({
        attributes: ['id','exam_type'],
    })
    if(examtypes) {
        return res.status(200).json(examtypes)
    } else {
        return res.status(400).json({message:"error"})
    }
}