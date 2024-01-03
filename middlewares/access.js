// const accessRole = (ST) => {
//   console.log("hello Middleware")
// }
// module.exports = {accessRole}
const db =require('../models')
const Register = db.register
const checkRole = (roles) => async (req, res, next) => {
    console.log(roles)
    // let { role_name } = req.body;
    // console.log(req.body)
    // console.log(req.user)
    
    //retrieve employee info from DB
    const employee = await Register.findOne({where:{ email:req.user.email }});
    // console.log(employee)
    // if(employee.role_name== roles[0] || employee.role_name==roles[1]) {
        if (roles.includes(employee.role_name)) {
        next()
    } else {
        return res.status(401).json("message:Unauthorised")
    }
    // !roles.includes(employee.role)
    // ? res.status(401).json("Sorry you do not have access to this route")
    // : next();
    // console.log(employee)
    };

    module.exports = {checkRole}