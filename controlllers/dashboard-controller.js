const db = require("../models");
const Dashboard = db.dashboard;

exports.createdashboard = async(req,res,next) => {
    try{
        const {name,subname,role_name} = req.body;
        const dashboard ={
            name:req.body.name,
            subname:req.body.subname,
            role_name:req.body.role_name
        }
        const result = await Dashboard.create(dashboard)
        if(result){
            return res.status(200).json({data:result})
        } else {
            return res.status(400).json(error)
        }
    } catch (error) {
        console.log(error)

    }
} 


exports.getdashboard = async(req,res,next) => {
    try{
    const result = await Dashboard.findAll()
    if(result){
        const resultData = result.map((item) => ({
            name: item.name,
            subname: item.subname,
            role_name:item.role_name
          }));
          return res.status(200).json({ data: resultData });
    } else {
        return res.status(400).json(error)
    }
    } catch (error) {
           console.log(error)
    }
}