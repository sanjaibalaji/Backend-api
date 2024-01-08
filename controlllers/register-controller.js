const db = require("../models");
const { EMAIL_USERNAME, EMAIL_PASSWORD } = require('../config/db.config')
const Register = db.register;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { SECRET } = require("../config/index");
const nodemailer = require("nodemailer")
const crypto = require("crypto")
const bcrypt = require('bcrypt');
const { error } = require("console");
const { AsyncQueueError } = require("sequelize");



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
    html: `Please click <a href="https://student.odooformybusiness.com/create_password?verificationToken=${verificationToken}">here</a> to verify your email address.`
  };
  const mail = await transporter.sendMail(mailOptions);
  if (mail.accepted.length) {
    const role_name = req.body.role_name;
const rolesString = Array.isArray(role_name) ? role_name.join(',') : role_name;
    const register = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      college_name:req.body.college_name,
      role_name: rolesString,
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

exports.gsign = async (req,res,next) => {
  const {email} =req.body;
  if(!email) {
    return res.status(400).json({ error: 'select the email' }); 
  }
  const user = await Register.findOne({ where: { email } });
  if(isVerified=true) {
    return res.status(400).json({error:'email is not verified'})
  }
  if(!user) {
    return res.status(400).json({error:'email is not registered'})
  } else {
    return res.status(200).json(user)
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
      user_id: user.user_id,
      role_name: user.role_name,
      email: user.email,
      token: `${token}`,
      expiresIn: 168,   
    };
    res.status(200).json({ message: 'Logged in successfully',result });
  }
}


exports.logout = async (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};


exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const user = await Register.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const verificationToken = crypto.randomBytes(32).toString('hex');
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
    html: `Please click <a href="https://student.odooformybusiness.com/reset_password?verificationToken=${verificationToken}">here</a> to verify your email address.`
  };
  const mail = await transporter.sendMail(mailOptions);
  if (mail.accepted.length) {
    const register = await Register.update({ verificationToken }, { where: { email } })
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
  if (!req.body.password) {
    return res.status(400).json({ error: 'Password is  required' });
  }
  console.log(req.body.password)
  const salt = bcrypt.genSaltSync();
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  const result = await Register.update({ password: req.body.password }, { where: { verificationToken } })
  if(result){
  var verified = await Register.update({verificationToken:null},{where:{email:user.email}})
  }
  if (verified) {
    return res.status(200).json({ message: "Password reset successfull" });
  }
  else {
    return res.status(400).json({ error: "User is not registered" });
  }
}

exports.forms = async (req,res,next) => {
  const {email} = req.query
  const {batch,session,dept_code,year} = req.body
    
   const data ={
    batch : req.body.batch,
    dept_code : req.body.dept_code,
    session : req.body.session,
    year : req.body.year
   }
   try {
  const results = await Register.update(data,{where:{email:email}}) 
  if(results) {
    return res.status(200).json({message:"data updated"})
  } else {
    console.log(error)
    return res.status(404).json({message:"error"})
    
  }
} catch (error) {
  console.log(error);
  return res.status(500).json({message:"Internal server error"})
}
}


