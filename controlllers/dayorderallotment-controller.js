const db = require("../models");
const { subscribe } = require("../routes/routes");
const Dayorder = db.dayorder_allotment;
const Timetable = db.timetable
const Subject = db.subject_details
const Register = db.register
const Department = db.department
const Classes = db.classes


exports.staffmytimetable = async (req, res, next) => {
  try {
    
    const currentDate = new Date();
      console.log(currentDate.toISOString().split('T')[0])
    const matchingDayorder = await Dayorder.findOne({
      where: {
        today_date: currentDate 
      }

    });
        const dayorder = await Timetable.findAll({where:{dayorder:matchingDayorder.dayorder}})
        var subjects = []
        for (const element of dayorder) {
          try {
            const subject_detail = await Subject.findOne({ where: {id: element.sub_code },attributes:['sub_name','color_code']});
            const user = await Register.findOne({ where: { user_id: element.user_id },attributes:['firstName','lastName']});
            const department = await Department.findOne({ where: { id: element.dept_id },attributes:['dept_name']});
            const classes = await Classes.findOne({ where: { id: element.class_code },attributes:['section']});
            // const period = element.period_no
            // console.log(period)
            // subjects.push(user)
            // subjects.push(subject_detail);
            // subjects.push(department)
            // subjects.push(classes)
            // subjects.push(period)
            subjects.push({
              user,
              subject_detail,
              department,
              classes,
              period_no: element.period_no // Add this line
            });
           
          } catch (error) {
            console.error('Error fetching subject:', error);
          }
        }
        
       
    // If a matching dayorder is found, return true
    if (subjects) {
      return res.json({ success: subjects });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("Error fetching dayorder:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
};





// exports.studenttimetable = async (req, res, next) => {
//   const {dept_code,batch_id,class_id} = req.params
//   const currentDate = new Date();
//       console.log(currentDate.toISOString().split('T')[0])
//     const matchingdata = await Dayorder.findOne({
//       where: {
//         today_date: currentDate,dept_code:dept_code,batch_id:batch_id,class_id:class_id 
//       }
//     });
//     if (matchingdata){
//       return res.status(200).json({data:matchingdata})
//     } else {
//       return res.status(400).json({error})

//     }
  
  // }


  exports.studenttimetable = async (req, res, next) => {
    try {
      const { dept_code, batch_id, class_id } = req.query;
      const currentDate = new Date();
      console.log(currentDate.toISOString().split('T')[0]);
  
      const matchingdata = await Dayorder.findOne({
        where: {
          today_date: currentDate,
          dept_code: dept_code,
          batch_id: batch_id,
          class_id: class_id
        }
      });
  
      const dayorder = await Timetable.findAll({where:{dayorder:matchingdata.dayorder}})
      var subjects = []
      for (const element of dayorder) {
        try {
          const subject_detail = await Subject.findOne({ where: {id: element.sub_code },attributes:['sub_name','color_code']});
          const rawStartTime = element.start_time; // Assuming it's in the format "HH:MM:SS"
          const rawEndTime = element.end_time; 
          const startHours = rawStartTime.substring(0, 2);
    const startMinutes = rawStartTime.substring(3, 5);
    const endHours = rawEndTime.substring(0, 2);
    const endMinutes = rawEndTime.substring(3, 5);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);
    const formattedStartTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });


              subjects.push({
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            sub_name: subject_detail ? subject_detail.sub_name : null,
            period_no: element.period_no
          });
  
         
        } catch (error) {
          console.error('Error fetching subject:', error);
        }
      }
      
     
  // If a matching dayorder is found, return true
  if (subjects) {
    return res.json({ data: subjects });
  } else {
    return res.json({ success: false });
  }
} catch (error) {
  console.error("Error fetching dayorder:", error);
  return res.status(500).json({ error: "An error occurred" });
}
};


exports.datestudenttimetable = async (req, res, next) => {
  try {
    const { dept_code, batch_id, class_id ,today} = req.body;
    console.log("date1",today)
    var today_date = new Date(today)
    const matchingdata = await Dayorder.findOne({
      where: {
        today_date: today_date,
        dept_code: dept_code,
        batch_id: batch_id,
        class_id: class_id
      }
      // ,attributes:['day']
      
    });
    console.log("data",matchingdata)
    const dayorder = await Timetable.findAll({where:{dayorder:matchingdata.dayorder}})
    var subjects = []
    for (const element of dayorder) {
      try {
        const subject_detail = await Subject.findOne({ where: {id: element.sub_code },attributes:['sub_name','color_code']});
        const rawStartTime = element.start_time; // Assuming it's in the format "HH:MM:SS"
        const rawEndTime = element.end_time; 
        const startHours = rawStartTime.substring(0, 2);
  const startMinutes = rawStartTime.substring(3, 5);
  const endHours = rawEndTime.substring(0, 2);
  const endMinutes = rawEndTime.substring(3, 5);

  const startDate = new Date();
  startDate.setHours(startHours, startMinutes, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHours, endMinutes, 0, 0);
  const formattedStartTime = startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const formattedEndTime = endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });


            subjects.push({
          start_time: formattedStartTime,
          end_time: formattedEndTime,
          sub_name: subject_detail ? subject_detail.sub_name : null,
          period_no: element.period_no,
          // today_date: today_date.toISOString(),
          day: element.day,
        });

       
      } catch (error) {
        console.error('Error fetching subject:', error);
      }
    }
    
    const responseData = {
      today_date: today_date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),

      day: matchingdata.day, // You might need to get the actual day from the Dayorder model
      data: subjects,
    };
// // If a matching dayorder is found, return true
if (subjects) {
  return res.json(  responseData );
} else {
  return res.json({ success: false });
}
} catch (error) {
console.error("Error fetching dayorder:", error);
return res.status(500).json({ error: "An error occurred" });
}
};



