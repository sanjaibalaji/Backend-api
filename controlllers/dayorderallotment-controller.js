const db = require("../models");
const Dayorder = db.dayorder_allotment;

exports.dayorder = async (req, res, next) => {
  try {
    // Get the current system date
    const currentDate = new Date();
      console.log(currentDate)
    // Fetch the dayorder from the database where today_date matches the current date
    const matchingDayorder = await Dayorder.findOne({
      where: {
        today_date: currentDate.toISOString().split('T')[0] // Convert date to yyyy-mm-dd format
      }
    });

    // If a matching dayorder is found, return true
    if (matchingDayorder) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("Error fetching dayorder:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
};
