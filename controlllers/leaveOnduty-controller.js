const db = require("../models");
const Leaveonduty = db.leaveonduty;

exports.leave = async (req, res, next) => {
  try {
    const leaveDataArray = req.body.map((leaveData) => ({
      user_id:leaveData.user_id,
      req_type: leaveData.req_type,
      from_date: leaveData.from_date,
      to_date: leaveData.to_date,
      no_of_days: leaveData.no_of_days,
      duration: leaveData.duration,
      sessions: leaveData.sessions,
      reason: leaveData.reason,
    }));

    const result = await Leaveonduty.bulkCreate(leaveDataArray);

    if (result) {
      return res.status(200).json({ data: result });
    } else {
      return res.status(400).json({ error: "Error creating entries" });
    }
  } catch (error) {
    console.error("Error creating leave entries:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.onduty = async (req, res, next) => {
    try {
      const ondutyDataArray = req.body.map((ondutyData) => ({
        req_type: ondutyData.req_type,
        user_id:ondutyData.user_id,
        from_date: ondutyData.from_date,
        from_time: ondutyData.from_time,
        to_time: ondutyData.to_time,
        sessions: ondutyData.sessions,
        reason: ondutyData.reason,
      }));
  
      const result = await Leaveonduty.bulkCreate(ondutyDataArray);
  
      if (result) {
        return res.status(200).json({ data: result });
      } else {
        return res.status(400).json({ error: "Error creating entries" });
      }
    } catch (error) {
      console.error("Error creating leave entries:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  exports.getleavelist = async (req,res,next) => {
    try {
        // Query the database for entries where isApproved is null
        const result = await Leaveonduty.findAll({
          where: {
            is_approved: null,
          },
        });
         
        return res.status(200).json({ data: result });
      } catch (error) {
        console.error("Error fetching unapproved leave entries:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };
  
    exports.getleavedetails = async (req, res, next) => {
      try {
        const { user_id } = req.query; // Assuming user_id is a parameter in the request
    
        // Query the database for entries where isApproved is null and user_id matches
        const result = await Leaveonduty.findAll({
          where: {
           
            user_id: user_id, // Adjust this line based on your actual column name
          },
         
        });
        const update = await Leaveonduty.update({is_approved: req.body.is_approved }, { where: { user_id:user_id } })
    
        return res.status(200).json({ data: result });
      } catch (error) {
        console.error("Error fetching unapproved leave entries:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };
    