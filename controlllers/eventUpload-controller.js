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
const path = require('path');


exports.eventsupload = async (req, res) => {
  try {
    const { user_id, firstName, event_name, hosting_dept, date, start_time, end_time, chief_Guest, venue } = req.body;
    const base64Image = req.body.image; // Assuming the front-end sends the image in a field named 'image'

    // Remove the header from the base64 string
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Create a unique name for the image
    const imageName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;

    // Save the image to the server's folder
    const imagePath = path.join('images', imageName);
    
    fs.writeFileSync(imagePath, base64Data, { encoding: 'base64' });

    const imageBuffer = await fs.promises.readFile(imagePath);
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
                   event_image_name: imageName,
                   event_image_path: imagePath,
                   event_image_path1: imageBuffer,
                   
               });
               const newData = await EventUpload.create(dataRows);
    // Respond with success message and image path
    res.status(200).json({
      message: 'Image uploaded successfully',
      data: newData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
          const imageUrl = `https://odooformybusiness.com/${event.event_image_path}`;
          return {
            eventname:event.event_name, // Change this value as needed
            hostdept: event.hosting_dept,
            cguest: event.chief_Guest,
            venue: event.venue,
            image: imageUrl, // Assuming this is the URL to the image
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
          const imageUrl = `https://odooformybusiness.com/${event.event_image_path}`;
          return {
            eventname:event.event_name, // Change this value as needed
            hostdept: event.hosting_dept,
            cguest: event.chief_Guest,
            venue: event.venue,
            image: imageUrl, // Assuming this is the URL to the image
            
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
  
  exports.deleteevent = async (req,res,next) => {
    const id = req.query.id
    const result = await EventUpload.destroy({where:{id:req.query.id}})
    if (result) {
      return res.status(200).json({message:"event deleted successfully"})
    }
  }