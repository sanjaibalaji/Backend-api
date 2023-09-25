const db = require("../models");
const { subscribe } = require("../routes/routes");
const Dayorder = db.dayorder_allotment;
const Timetable = db.timetable
const Subject = db.subject_details


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
          day: element.day,
        });
      } catch (error) {
        console.error('Error fetching subject:', error);
      }
    }
    const responseData = {
      today_date: today_date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      day: matchingdata.day, 
      data: subjects,
    };
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



