const db = require("../models/index");
const Department=db.department
const Timetable=db.timetable
const subjectDetails=db.subject_details



exports.timetable = async (req, res, next) => {
    const {dept_id,sub_id,class_id,user_id,batch,dayorder,period_no} = req.body;
    if (!dept_id) {
        return res.status(400).json({ error: 'Enter the dept id' });
      }
      if(!sub_id) {
        return res.status(400).json({ error: 'Enter the sub id' });
      }
      if(!class_id) {
        return res.status(400).json({ error: 'Enter the class id' });
      }
      if(!user_id) {
        return res.status(400).json({ error: 'Enter the staff id' });
      }
      if(!batch) {
        return res.status(400).json({ error: 'Enter the batch' });
      }
      if(!dayorder) {
        return res.status(400).json({ error: 'Enter the dayorder' });
      }
      if(!period_no) {
        return res.status(400).json({ error: 'Enter the period_no' });
      }
      const timetable = {
        dept_id: req.body.dept_id,
        sub_id:req.body.sub_id,
        class_id: req.body.class_id,
        batch:req.body.batch,
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

exports.getTimetableList = async (req,res,next) => {
  const {dept_id,class_code,batch_id} =req.query;
  console.log(dept_id,class_code,batch_id)
try{
  const users = await Timetable.findAll({
    
    where:[{dept_id:dept_id},{class_code:class_code},{batch_id:batch_id}],
  
    attributes:['id','dayorder','period_no'],
    include:[{
      model:subjectDetails,
      attributes:['sub_name','color_code','color_name'],
      
    }],
    
  },
  
  );
  res.json({data:users})
}catch(error){
console.log(error)
}
 
  
}
