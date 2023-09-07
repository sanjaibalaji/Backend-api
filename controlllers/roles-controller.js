const db = require("../models");
const Roles = db.roles;

exports.role = async (req, res, next) => {
    const {role_name} = req.body;
      if(!role_name) {
        return res.status(400).json({ error: 'Enter the role' });
      }
      const roles = {
        role_id: req.body.role_id,
        role_name:req.body.role_name,
      }
      const result = await Roles.create(roles)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "error" });
      }
}

exports.rolelist = async (req,res,next) => {
  const result = await Roles.findAll()
if (result) {
       return res.status(200).json({ data: result });
     }
     else {
       return res.status(400).json({ error: "error" });
     }
}
