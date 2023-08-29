const db = require("../models/index");
const Department=db.department
const Timetable=db.timetable
const subjectDetails=db.subject_details



exports.timetable = async (req, res, next) => {
    const {dept_id,sub_code,class_code,user_id,batch_id,dayorder,period_no} = req.body;
    if (!dept_id) {
        return res.status(400).json({ error: 'Enter the dept id' });
      }
      if(!sub_code) {
        return res.status(400).json({ error: 'Enter the sub code' });
      }
      if(!class_code) {
        return res.status(400).json({ error: 'Enter the class code' });
      }
      if(!user_id) {
        return res.status(400).json({ error: 'Enter the staff id' });
      }
      if(!batch_id) {
        return res.status(400).json({ error: 'Enter the batch id' });
      }
      if(!dayorder) {
        return res.status(400).json({ error: 'Enter the dayorder' });
      }
      if(!period_no) {
        return res.status(400).json({ error: 'Enter the period_no' });
      }
      const timetable = {
        dept_id: req.body.dept_id,
        sub_code:req.body.sub_code,
        class_code: req.body.class_code,
        batch_id:req.body.batch_id,
        user_id:req.body.user_id,
        dayorder: req.body.dayorder,
        period_no:req.body.period_no
        
      }

      const result = await Timetable.create(timetable)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }


}

exports.updatetimetable = async (req, res, next) => {
  const {dept_id,class_code,user_id,batch_id,dayorder,period_no,sub_code} = req.body;
  const result = await Timetable.update({sub_code:req.body.sub_code},
    {where:{dept_id:req.body.dept_id,
     class_code:req.body.class_code,
    user_id:req.body.user_id,
  batch_id:req.body.batch_id,
dayorder:req.body.dayorder,
period_no:req.body.period_no}})
  

    if (result[0]>0) {
      return res.status(200).json({message:"Subject updates", data: result });
    }
    else {
      return res.status(400).json({ error: "error" });
    }

  }



exports.getTimetableList = async (req, res, next) => {
  const { dept_id, class_code, batch_id } = req.query;
  try {
    const timetableData = await Timetable.findAll({
      where: { dept_id: dept_id, class_code: class_code, batch_id: batch_id },
      attributes: ['id', 'dayorder', 'period_no'],
      include: [{
        model: subjectDetails,
        attributes: ['sub_code','sub_name', 'color_code', 'color_name'],
      }],
    });

    const groupedData = timetableData.reduce((result, entry) => {
      const dayorder = `dayorder_${entry.dayorder}`;
      console.log(entry.dayorder)
      if (!result[dayorder]) {
        result[dayorder] = [];
      }
      result[dayorder].push(entry);
      return result;
    }, {});

    res.json({ data: groupedData });
  } catch (error) {
    console.log(error);
  }
};
