const db = require("../models");
const Dayorder = db.dayorder_allotment;


exports.dayorder = async(req,res,next) => {
    // const today = new Date().toISOString().split('T')[0];
    // console.log(today)
    const today = new Date().toISOString();
     console.log('Today:', today);
    const result = await Dayorder.findAll({where:{new_date:today}})
    console.log(result)
    if(result){
        console.log(result[0].new_date)
        return res.status(200).json({message:"true"})
    }else {
        return res.status(400).json({message:"false"})
    }
   
}