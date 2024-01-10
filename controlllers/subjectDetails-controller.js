const db = require("../models");
const SubjectDetails = db.subject_details;

exports.subjects = async (req, res, next) => {
    const {sub_code,sub_name} = req.body;
    if (!sub_code) {
        return res.status(400).json({ error: 'Enter the subject id' });
      }
      if(!sub_name) {
        return res.status(400).json({ error: 'Enter the subject name' });
      }
      const subjects = {
        sub_code: req.body.sub_code,
        sub_name:req.body.sub_name,
        color_name:req.body.sub_name,
        color_code:req.body.sub_name,
      }
      const result = await SubjectDetails.create(subjects)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}