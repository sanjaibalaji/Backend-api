const db = require("../models");
const batch_details = require("../models/batch_details");
const Classes = db.classes;
const BatchDetails = db.batch_details;

exports.classes = async (req, res, next) => {
    const {dept_id,section,strength,batch} = req.body;
    if (!dept_id) {
        return res.status(400).json({ error: 'Enter the dept id' });
      }
      if(!section) {
        return res.status(400).json({ error: 'Enter the section' });
      }
      if(!strength) {
        return res.status(400).json({ error: 'Enter the strength' });
      }
      if(!batch) {
        return res.status(400).json({ error: 'Enter the batch' });
      }
      const classes = {
        dept_id: req.body.dept_id,
        section:req.body.section,
        strength: req.body.strength,
        batch:req.body.batch
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