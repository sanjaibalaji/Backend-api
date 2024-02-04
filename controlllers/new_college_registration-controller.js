const db = require("../models");
const Newclgregister = db.NewcollegeRegistration;
const nodemailer = require("nodemailer")
const { EMAIL_USERNAME, EMAIL_PASSWORD } = require('../config/db.config')





exports.collegeregistration = async (req, res, next) => {

    if (!req.body.college_email) {
      return res.status(400).json({ error: 'Email is  required' });
    }
    if (!/\S+@\S+.\S+/.test(req.body.college_email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    const existingUser = await Newclgregister.findOne({ where: { college_email: req.body.college_email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: EMAIL_USERNAME,
      to: req.body.college_email,
      subject: 'Verify your email address',
      html: `Please click <a href="https://student.odooformybusiness.com/register">here</a> to register your college.`
    };
    const mail = await transporter.sendMail(mailOptions);
    if (mail.accepted.length) {
      
      const register = {
       college_name : req.body.college_name,
       clg_code : req.body.clg_code,
       college_email : req.body.college_email
      }
  
      const result = await Newclgregister.create(register)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "User is not registered" });
      }
    } else {
      return res.status(400).json({ error: "Mail sent unsuccessfull" });
    }
  };