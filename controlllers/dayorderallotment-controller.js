const db = require("../models");
const Dayorder = db.dayorder_allotment;


exports.dayorder = async(req,res,next) => {
    const today = new Date().toISOString().split('T')[0];
    console.log(today)
    const result =await Dayorder.findAll({where:{date:today}})
    console.log(result)
    if(result){
        return res.status(200).json({message:"true"})
    }else {
        return res.status(400).json({message:"true"})
    }
   
}