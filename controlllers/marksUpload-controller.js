// const db = require("../models");
// const MarksUpload = db.marks_uploads;


// exports.marksupload = async (req, res) => {
//     try {
//       // Get the dropdown value from the request body
//       const { dept_code, batch_id, sub_code, examtype } = req.body;
//     const { user_id, obtained_marks, total_marks } = req.body;
  
//       // Get the path to the uploaded Excel file
//       const excelPath = req.file.path;
//       console.log(excelPath)
  
//       // Store the dropdown value and Excel data in the database
//       const newData = await MarksUpload.create({
//         dept_code,
//         batch_id,
//         sub_code,
//         examtype,
//         user_id,
//         obtained_marks,
//         total_marks, 
//         excelData: excelPath,// You can store the path to the uploaded file here
        
//       });
         
//       res.json(newData);
      
//     console.log(user_id)
//     console.log(obtained_marks)
//     console.log(total_marks)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while processing your request.' });
//   }
// };

// const db = require("../models");
// const MarksUpload = db.marks_uploads;
// const exceljs = require("exceljs"); // Require the exceljs library

// exports.marksupload = async (req, res) => {
//   try {
//     // Get the dropdown value from the request body
//     const { dept_code, batch_id, sub_code, examtype } = req.body;

//     // Get the path to the uploaded Excel file
//     const excelPath = req.file.path;
//     console.log(excelPath);

//     // Create an instance of the Excel workbook
//     const workbook = new exceljs.Workbook();
//     await workbook.xlsx.readFile(excelPath);

//     // Assuming the data is in the first sheet, you can adjust this as needed
//     const worksheet = workbook.getWorksheet(1);

//     // Extract the values for user_id, obtained_marks, and total_marks from the Excel sheet
//     const user_id = worksheet.getCell("A2").value; // Replace with the correct cell address
//     const obtained_marks = worksheet.getCell("B2").value; // Replace with the correct cell address
//     const total_marks = worksheet.getCell("C2").value; // Replace with the correct cell address

//     // Store the dropdown value and Excel data in the database
//     const newData = await MarksUpload.create({
//       dept_code,
//       batch_id,
//       sub_code,
//       examtype,
//       user_id,
//       obtained_marks,
//       total_marks,
//       excelData: excelPath,
//     });

//     res.json(newData);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing your request." });
//   }
// };


const db = require("../models");
const MarksUpload = db.marks_uploads;
const exceljs = require("exceljs"); // Require the exceljs library

exports.marksupload = async (req, res) => {
  try {
    // Get the dropdown value from the request body
    const { dept_code, batch_id, sub_code, examtype } = req.body;

    // Get the path to the uploaded Excel file
    const excelPath = req.file.path;
    console.log(excelPath);

    // Create an instance of the Excel workbook
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(excelPath);

    // Assuming the data is in the first sheet, you can adjust this as needed
    const worksheet = workbook.getWorksheet(1);

    // Initialize an array to store the data for all rows
    const dataRows = [];

    // Start iterating from the second row (assuming the first row contains headers)
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);

      // Extract the values for user_id, obtained_marks, and total_marks from the current row
      const user_id = row.getCell("A").value; // Replace with the correct column name
      const obtained_marks = row.getCell("B").value; // Replace with the correct column name
      const total_marks = row.getCell("C").value; // Replace with the correct column name

      // Push the extracted data into the array
      dataRows.push({
        dept_code,
        batch_id,
        sub_code,
        examtype,
        user_id,
        obtained_marks,
        total_marks,
        excelData: excelPath,
      });
    }

    // Store the array of data in the database (you can use bulk create for efficiency)
    const newData = await MarksUpload.bulkCreate(dataRows);

    res.json(newData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};
