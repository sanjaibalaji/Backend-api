const db = require("../models");
const Leaveonduty = db.leaveonduty;

exports.leave = async (req, res, next) => {
  try {
    const leaveDataArray = req.body.map((leaveData) => ({
      req_type: leaveData.req_type,
      from_date: leaveData.from_date,
      to_date: leaveData.to_date,
      from_time: leaveData.from_time,
      to_time: leaveData.to_time,
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
        from_date: ondutyData.from_date,
        to_date: ondutyData.to_date,
        from_time: ondutyData.from_time,
        to_time: ondutyData.to_time,
        period: ondutyData.period,
        duration: ondutyData.duration,
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
  