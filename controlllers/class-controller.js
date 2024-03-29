const db = require("../models");
const batch_details = require("../models/batch_details");
const Classes = db.classes;
const BatchDetails = db.batch_details;

exports.classes = async (req, res, next) => {
    const {dept_code,section,strength,batch_id} = req.body;
    if (!dept_code) {
        return res.status(400).json({ error: 'Enter the dept id' });
      }
      if(!section) {
        return res.status(400).json({ error: 'Enter the section' });
      }
      if(!strength) {
        return res.status(400).json({ error: 'Enter the strength' });
      }
      if(!batch_id) {
        return res.status(400).json({ error: 'Enter the batch' });
      }
      const classes = {
        dept_code: req.body.dept_code,
        section:req.body.section,
        strength: req.body.strength,
        batch_id:req.body.batch_id,
        class_code:req.body.class_code
      }
      const result = await Classes.create(classes)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}

exports.classlist = async (req, res, next) => {
  const id = req.query.id;
  console.log(id)
  try {
    const users = await BatchDetails.findAll(
      {where:{id:id},
      attributes: ['id'],
      include: [{
        model: Classes,
        attributes: ['section'],
      }],
    },
    );
    res.json({ data: users })
  } catch (error) {
    console.log(error)
  }
}