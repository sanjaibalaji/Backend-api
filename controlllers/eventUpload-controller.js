// const db = require("../models");
// const event_uploads = require("../models/event_uploads");
// const EventUpload = db.event_uploads;


// exports.eventupload = async (req, res) => {
//     try{
//     let file = {};
//     const  {user_id,firstName,event_name,hosting_dept,date,start_time,end_time,chief_Guest,venue} = req.body;
//     if (req.file) {
//         file.path = req.file.path;
//         file.name = req.file.filename;
//     }
//     const dataRows = [];
//     dataRows.push({
//         firstName,
//         event_name,
//         hosting_dept,
//         date,
//         user_id,
//         start_time,
//         end_time,
//         chief_Guest,
//         venue,
//         event_image_path:file.path,
//         event_image_name:file.name
//       });
//       const newData = await event_uploads.create(dataRows);
//       console.log(newData)
//       res.status(200).json({ newData});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred while processing your request." });
//     }

   
// }


const db = require("../models");
const EventUpload = db.event_uploads
const fs = require('fs');
const sequelize = require('sequelize')

exports.eventsupload = async (req, res) => {
    try {
        let file = {};
        const { user_id, firstName, event_name, hosting_dept, date, start_time, end_time, chief_Guest, venue } = req.body;
        if (req.file) {
            file.path = req.file.path;
            file.name = req.file.filename;
        }
        const imageBuffer = await fs.promises.readFile(req.file.path);

        const dataRows = ({
            firstName,
            event_name,
            hosting_dept,
            date,
            user_id,
            start_time,
            end_time,
            chief_Guest,
            venue,
            event_image_path1: imageBuffer,
            event_image_path: file.path,
            event_image_name: file.name
        });

        const newData = await EventUpload.create(dataRows);
        console.log(newData);
        res.status(200).json({ newData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}




exports.upcomingevent= async (req, res) => {
    try {
      // const results = await EventUpload.findAll();
      const currentDate = new Date();
      const results = await EventUpload.findAll({
          where: {
              date: {
                  [sequelize.Op.gte]: currentDate, // Filter events with date greater than or equal to the current date
              },
          },
      });
      if (results) {
        const transformedData = results.map((event) => {
          const startDate = new Date(event.date);
          const formattedDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
          const startTime = formatTime(event.start_time);
          const endTime = formatTime(event.end_time);
  
          return {
            eventname:event.event_name, // Change this value as needed
            hostdept: event.hosting_dept,
            cguest: event.chief_Guest,
            venue: event.venue,
            image: event.event_image_path, // Assuming this is the URL to the image
            date: formattedDate,
            starttime: startTime,
            endtime: endTime,
          };
        });
  
        return res.status(200).json({ data: transformedData });
      } else {
        return res.status(400).json({ error: "No events found." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while processing your request." });
    }
  };
  
  // Helper function to format time (e.g., "11:15 AM")
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
  
    // Convert 24-hour time to 12-hour time with AM/PM
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }



  exports.finishedevent = async (req, res) => {
    try {
      // const results = await EventUpload.findAll();
      const currentDate = new Date();
      const results = await EventUpload.findAll({
          where: {
              date: {
                  [sequelize.Op.lt]: currentDate, // Filter events with date greater than or equal to the current date
              },
          },
      });
      if (results) {
        const transformedData = results.map((event) => {
          const startDate = new Date(event.date);
          const formattedDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
          const startTime = formatTime(event.start_time);
          const endTime = formatTime(event.end_time);
  
          return {
            eventname:event.event_name, // Change this value as needed
            hostdept: event.hosting_dept,
            cguest: event.chief_Guest,
            venue: event.venue,
            image: event.event_image_path, // Assuming this is the URL to the image
            date: formattedDate,
            starttime: startTime,
            endtime: endTime,
          };
        });
  
        return res.status(200).json({ data: transformedData });
      } else {
        return res.status(400).json({ error: "No events found." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "An error occurred while processing your request." });
    }
  };
  
  // Helper function to format time (e.g., "11:15 AM")
  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
  
    // Convert 24-hour time to 12-hour time with AM/PM
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }
  