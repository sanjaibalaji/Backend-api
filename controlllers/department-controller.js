const db = require("../models");
const Department = db.department;
const BatchDetails = db.batch_details;

exports.department = async (req, res, next) => {
  const { dept_code, dept_name, no_of_sections, user_id } = req.body;
  if (!dept_code) {
    return res.status(400).json({ error: 'Enter the dept code'});
  }
  if (!dept_name) {
    return res.status(400).json({ error: 'Enter the dept_name'});
  }
  if (!no_of_sections) {
   return res.status(400).json({ error: 'Enter the no_of_sections'});
  }
  if (!user_id) {
    return res.status(400).json({ error: 'Enter the user_id'});
  }
  const department = {
    dept_code: req.body.dept_code,
    dept_name: req.body.dept_name,
    batch_id: req.body.batch_id,
    no_of_sections: req.body.no_of_sections,
    user_id: req.body.user_id
  }
  const result = await Department.create(department)
  if (result) {
    return res.status(200).json({ data: result });
  }
  else {
    return res.status(400).json({ error: "error" });
  }
}
exports.departmentlist = async (req, res, next) => {
  const result = await Department.findAll({ 
    attributes: ['dept_code','dept_name'],
    group:['dept_code','dept_name'],
    distinct:true,
     });
  if (result) {
    return res.status(200).json({ data: result });
  } else {
    return res.status(400).json({ error })
  }
}

// exports.departmentbatchlist = async (req, res, next) => {
//   const dept_code = req.query.dept_code;
//   console.log(dept_code)
//   try {
//     const users = await Department.findAll(
//       {where:{dept_code},
//       attributes: ['id'],
//       include: [{
//         require:false,
//         model: BatchDetails,
//         attributes: ['id','batch','year','sessions',],
//       }],
//       }
//     );
//     res.json({data: users})
//   } catch (error) {
//     console.log(error)
//   }
// }

exports.departmentbatchlist = async (req, res, next) => {
  const dept_code = req.query.dept_code;
  console.log(dept_code);

  try {
    const users = await Department.findAll({
      where: { dept_code },
      attributes: ['id'],
      include: [
        {
          require: false,
          model: BatchDetails,
          attributes: ['id', 'batch', 'year', 'sessions'],
        },
      ],
    });

    // Extract the batch details
    const batchDetails = users[0].batch_details;

    // Create a map to store distinct batch values and associated years
    const batchMap = new Map();

    // Process the batch details and group them by batch values
    batchDetails.forEach((batchDetail) => {
      const { batch, year } = batchDetail;
      if (!batchMap.has(batch)) {
        batchMap.set(batch, []);
      }
      batchMap.get(batch).push(year);
    });

    // Create a new response object with grouped batch details
    const response = {
      data: [
        {
          id: users[0].id,
          batch_details: Array.from(batchMap.entries()).map(([batch, years]) => ({
            batch,
            years,
          })),
        },
      ],
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
