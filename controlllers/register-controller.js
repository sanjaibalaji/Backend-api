const db = require("../models");
const { EMAIL_USERNAME, EMAIL_PASSWORD } = require('../config/db.config')
const Register = db.register;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { SECRET } = require("../config");
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const bcrypt = require('bcrypt');
const { error } = require("console");



exports.register = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ error: 'Email is  required' });
  }
  if (!/\S+@\S+.\S+/.test(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const existingUser = await Register.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }
  const verificationToken = crypto.randomBytes(32).toString('hex')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: EMAIL_USERNAME,
    to: req.body.email,
    subject: 'Verify your email address',
    html: `Please click <a href="http://localhost:8080/create_password?verificationToken=${verificationToken}">here</a> to verify your email address.`
  };
  const mail = await transporter.sendMail(mailOptions);
  if (mail.accepted.length) {
    const register = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      college_name:req.body.college_name,
      role_name:req.body.role_name,
      verificationToken
    }

    const result = await Register.create(register)
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
exports.verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.query;
  const user = await Register.findOne({ where: { verificationToken } });
  if (!user) {
    return res.status(400).json({ error: 'Email not found' });
  }
  
  const result = await Register.update({ isVerified: true }, { where: { verificationToken } })
  console.log(result)
  
  if ([result]) {
    if (!req.body.password) {
      return res.status(400).json({ error:'Password is  required'});
    }
    console.log(req.body.password)
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const result = await Register.update({ password: req.body.password }, { where: { verificationToken } }, { verificationToken: null })
    const verified = await Register.update({ verificationToken: null }, { where: { isVerified: true } })
    

    if (result) {
      return res.status(200).json({ message: "User is  registered" });
    }
    else {
      return res.status(400).json({ error: "User is not registered" });
    }
   

  } else {
    return res.status(400).json({ error: "User is not verified" });
  }

}
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = await Register.findOne({ where: { email } });
  console.log(user)
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  if (!user.isVerified) {
    return res.status(401).json({ error: 'Email address not verified' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  else {
    let token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role_name,
        email: user.email
      },
      SECRET,
      { expiresIn: "7 days" }
    );
    let result = {
      role: user.role_name,
      email: user.email,
      token: `${token}`,
      expiresIn: 168,
      
    };
    res.status(500).json({ message: 'Logged in successfully',result });
  }



}
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const user = await Register.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const verificationToken = crypto.randomBytes(32).toString('hex')

    ;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: EMAIL_USERNAME,
    to: req.body.email,
    subject: 'Password reset link',
    html: `Please click <a href="http://localhost:8080/reset_password?verificationToken=${verificationToken}">here</a> to verify your email address.`
  };
  const mail = await transporter.sendMail(mailOptions);
  if (mail.accepted.length) {
    const register = await Register.update({ verificationToken }, { where: { email } })
    // const result = await Register.update(register)
    if (register) {
      return res.status(200).json({ data: "Mail sent" });
    }
    else {
      return res.status(400).json({ error: "Mail sent Unsuccessfully" });
    }
  } else {
    return res.status(400).json({ error: "Error" });
  }
}


exports.resetPassword = async (req, res, next) => {
  const { verificationToken } = req.query;
  const user = await Register.findOne({ where: { verificationToken } });
  if (!user) {
    return res.status(400).json({ error: 'Invalid verification token' });
  }

  // exports.checkPassword = check('password').trim().notEmpty().withMessage('Password required')
  // .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
  // .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
  // .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
  // .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
  // .matches(/(?=.?[#?!@$%^&-])/).withMessage('At least one special character')
//   exports.validate = (req, res, next) => {
// const errors = validationResult(req);
// if (errors.isEmpty()) {
//  return next();
// } else {
//  return res.status(400).json({ errors: errors.array() });
// }
// };
  if (!req.body.password) {
    return res.status(400).json({ error: 'Password is  required' });
  }
  console.log(req.body.password)
  const salt = bcrypt.genSaltSync();
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  const result = await Register.update({ password: req.body.password }, { where: { verificationToken } }, { verificationToken: null })
  const verified = await Register.update({ verificationToken: null }, { where: { isVerified: true } })

  if (result) {
    return res.status(200).json({ message: "Password reset successfull" });
  }
  else {
    return res.status(400).json({ error: "User is not registered" });
  }







}


// exports.getProfile = async (req, res, next) => {

// const existingUser = await Register.findOne({ where: { user_id: req.user.user_id } });
// return res.status(200).json({data:existingUser });
 

// };

// exports.logout =  async (req, res)=> {
//   // if(req.user){
//   //     req.user.update({loggedOutAt: new Date()});
//   // }
//   res.clearCookie("XSRF-token");
//   return res.redirect('/');
// }



