const db = require("../models");
const timetable = require("../models/timetable");
const { department } = require("./department-controller");
const Timetable=db.timetable
const Department=db.department
const Batch=db.batch_details
const Classes = db.classes;
const Subject = db.subject_details
const Register = db.register
const Dayorder = db.dayorder_allotment;



// exports.staffmytimetable = async (req, res, next) => {
//   try {
//     const currentDate = new Date();
//     console.log(currentDate.toISOString().split('T')[0]);
//     const matchingDayorder = await Dayorder.findOne({
//       where: {
//         today_date: currentDate,
//       },
//     });
//     const dayorder = await Timetable.findAll({ where: { dayorder: matchingDayorder.dayorder } });
//     var subjects = [];

//     for (const element of dayorder) {
//       try {
//         const subject_detail = await Subject.findOne({ where: { id: element.sub_code }, attributes: ['sub_code', 'sub_name', 'color_code', 'color_name'] });
//         const user = await Register.findOne({ where: { user_id: element.user_id }, attributes: ['user_id', 'firstName', 'lastName'] });
//         const department = await Department.findOne({ where: { id: element.dept_id }, attributes: ['dept_name'] });
//         const classes = await Classes.findOne({ where: { id: element.class_code }, attributes: ['section'] });
//         const batch = await Batch.findOne({ where: { id: element.batch_id }, attributes: ['year'] }); 

//         subjects.push({data:{
//           user_id: user ? user.user_id : null,
//           user_name: user ? `${user.firstName} ${user.lastName}` : null,
//           department: department ? department.dept_name : null,
//           dayorder: matchingDayorder.dayorder,
//           date:matchingDayorder.today_date,
//           day:matchingDayorder.day,
//           "period_details":[{
//             id: element.id,
//             period_no: element.period_no,
//             department: department ? department.dept_name : null,
//             year:batch ? batch.year:null,
//             section: classes ? classes.section : null,
//             subject_detail: subject_detail ? {
//               sub_code: subject_detail.sub_code,
//               sub_name: subject_detail.sub_name,
//               color_code: subject_detail.color_code,
//               color_name: subject_detail.color_name,
//             } : null,
//           }]
//         }});
//         // return res.json(subjects);
//       } catch (error) {
//         console.error('Error fetching subject:', error);
//       }
//     }
//     if (subjects.length > 0) {
//       return res.json(subjects);
//     } else {
//       return res.json({ data: null }); // You can customize this part if needed
//     }


//   } catch (error) {
//     console.error('Error fetching dayorder:', error);
//     return res.status(500).json({ error: 'An error occurred' });
//   }
// };


exports.staffmytimetable = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const currentDate = new Date();
    console.log(currentDate.toISOString().split('T')[0]);
    const matchingDayorder = await Dayorder.findOne({
      where: {
        today_date: currentDate,
      },
    });
    const dayorder = await Timetable.findAll({ where: { dayorder: matchingDayorder.dayorder,user_id:user_id } });
    var subjects = [];
   

    for (const element of dayorder) {
      try {
        const subject_detail = await Subject.findOne({ where: { id: element.sub_code }, attributes: ['sub_code', 'sub_name', 'color_code', 'color_name'] });
         user = await Register.findOne({ where: { user_id: element.user_id }, attributes: ['user_id', 'firstName', 'lastName'] });
        const department = await Department.findOne({ where: { id: element.dept_id }, attributes: ['dept_name'] });
        const classes = await Classes.findOne({ where: { id: element.class_code }, attributes: ['section'] });
        const batch = await Batch.findOne({ where: { id: element.batch_id }, attributes: ['year'] }); 

        subjects.push({
          id: element.id,
          period_no: element.period_no,
          user_id: user ? user.user_id : null,
          user_name: user ? `${user.firstName} ${user.lastName}` : null,
          department: department ? department.dept_name : null,
          year: batch ? batch.year : null,
          section: classes ? classes.section : null,
          subject_detail: subject_detail ? {
            sub_code: subject_detail.sub_code,
            sub_name: subject_detail.sub_name,
            color_code: subject_detail.color_code,
            color_name: subject_detail.color_name,
          } : null,
        });
      } catch (error) {
        console.error('Error fetching subject:', error);
      }
    }

    if (subjects.length > 0) {
      const response = {
        data: {
          user_id: subjects[0].user_id, // Assuming you want the first user_id
          user_name: subjects[0].user_name, // Assuming you want the first user_name
          department: subjects[0].department, // Assuming you want the department from the first subject
          dayorder: matchingDayorder.dayorder,
          date: matchingDayorder.today_date,
          day: matchingDayorder.day,
          periods_details: subjects,
        },
      };

      return res.json(response);
    } else {
      return res.json({ data: null }); // You can customize this part if needed
    }
  } catch (error) {
    console.error('Error fetching dayorder:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};



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
// exports.allstafftimetable = async(req,res,next) => {
//   const {dept_id,batch_id,class_code} = req.query;
//   const result = await Timetable.findAll({where:{dept_id:dept_id,batch_id:batch_id,class_code:class_code}})
//   if (result) {
// const stafftimetable = await Timetable.findAll({
//           where: { dept_id:dept_id,batch_id:batch_id,class_code:class_code},
//           include: [
//             {
//               model: Department,
//               attributes: ['dept_name'],
//               required : true
//             },
//             {
//               model: Batch,
//               attributes: ['batch'],
//               required : true
//             },
//             {
//               model: Classes,
//               attributes: ['section'],
//               require : true
//             },
//             {
//               model: Subject,
//               attributes: ['sub_name'],
//               required : true
//             },
//             {
//              model: Register,
//              attributes: ['firstName'],
//              required : true
//             },
//           ],
//         });
//         const filteredData = stafftimetable.filter(entry => entry.department!== null);
//             return res.status(200).json({data:filteredData}) 
//           } else {
//               return res.status(400).json({message:"error"})
//           }
// }

// exports.allstafftimetable = async (req, res, next) => {
//   const { dept_id, batch_id, class_code } = req.query;
//   const result = await Timetable.findAll({ where: { dept_id, batch_id, class_code } });
//   if (result) {
//     const stafftimetable = await Timetable.findAll({
//       where: { dept_id, batch_id, class_code },
//       include: [
//         {
//           model: Department,
//           attributes: ['dept_name'],
//           required: true,
//         },
//         {
//           model: Batch,
//           attributes: ['year'],
//           required: true,
//         },
//         {
//           model: Classes,
//           attributes: ['section'],
//           require: true,
//         },
//         {
//           model: Subject,
//           attributes: ['sub_name','color_code','color_name'],
//           required: true,
//         },
//         {
//           model: Register,
//           attributes: ['firstName'],
//           required: true,
//         },
//       ],
//     });

//     // Group timetable entries by department, year, section, and day order
//     const groupedData = stafftimetable.reduce((acc, entry) => {
//       const { department, batch_detail, class: classDetail, subject_detail } = entry;
//       const key = `${department.dept_name}-${batch_detail.batch}-${classDetail.section}-${entry.dayorder}`;

//       if (!acc[key]) {
//         acc[key] = {
//           department: department.dept_name,
//           year: batch_detail.year,
//           section: classDetail.section,
//           [`dayorder_${entry.dayorder}`]: [],
//         };
//       }

//       acc[key][`dayorder_${entry.dayorder}`].push({
//         id: entry.id,
//         period_no: entry.period_no,
//         dayorder: entry.dayorder,
//         staff_name: entry.register.firstName,
//         staff_id: entry.user_id,
//         subject_detail: {
//           sub_code: entry.sub_code,
//           sub_name: subject_detail.sub_name,
//           color_name:subject_detail.color_name,
//           color_code:subject_detail.color_code
//           // You can add color_code and color_name here if needed
//         },
//       });

//       return acc;
//     }, {});

//     return res.status(200).json({ data: Object.values(groupedData) });
//   } else {
//     return res.status(400).json({ message: "error" });
//   }
// };



exports.allstafftimetable = async (req, res, next) => {
  const { dept_id, batch_id, class_code } = req.query;
  const result = await Timetable.findAll({ where: { dept_id, batch_id, class_code } });
  if (result) {
    const stafftimetable = await Timetable.findAll({
      where: { dept_id, batch_id, class_code },
      include: [
        {
          model: Department,
          attributes: ['dept_name'],
          required: true,
        },
        {
          model: Batch,
          attributes: ['year'],
          required: true,
        },
        {
          model: Classes,
          attributes: ['section'],
          required: true,
        },
        {
          model: Subject,
          attributes: ['sub_name', 'color_code', 'color_name'],
          required: true,
        },
        {
          model: Register,
          attributes: ['firstName'],
          required: true,
        },
      ],
    });

    // Group timetable entries by department, year, section, and day order
    const groupedData = stafftimetable.reduce((acc, entry) => {
      const { department, batch_detail, class: classDetail, subject_detail } = entry;
      const key = `${department.dept_name}-${batch_detail.year}-${classDetail.section}`;
      if (!acc[key]) {
        acc[key] = {
          department: department.dept_name,
          year: batch_detail.year,
          section: classDetail.section,
        };
      }

      if (!acc[key][`dayorder_${entry.dayorder}`]) {
        acc[key][`dayorder_${entry.dayorder}`] = [];
      }

      acc[key][`dayorder_${entry.dayorder}`].push({
        id: entry.id,
        period_no: entry.period_no,
        dayorder: entry.dayorder,
        staff_name: entry.register.firstName,
        staff_id: entry.user_id,
        subject_detail: {
          sub_code: entry.sub_code,
          sub_name: subject_detail.sub_name,
          color_name: subject_detail.color_name,
          color_code: subject_detail.color_code,
        },
      });

      return acc;
    }, {});

    // Convert the grouped data to an array
    const dataArray = Object.values(groupedData);

    return res.status(200).json({ data: dataArray });
  } else {
    return res.status(400).json({ message: "error" });
  }
};
