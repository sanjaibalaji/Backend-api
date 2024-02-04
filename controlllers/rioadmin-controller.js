const db = require("../models");
const Rioadmin = db.RioAdmin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");




exports.register = async (req, res, next) => {
    if (!req.body.email) {
      return res.status(400).json({ error: 'Email is  required' });
    }
    if (!/\S+@\S+.\S+/.test(req.body.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    const existingUser = await Rioadmin.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    } 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const rioadmin = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password:hashedPassword
        
      }
  
      const result = await Rioadmin.create(rioadmin)
      if (result) {
        return res.status(200).json({ data: result });
      }
      else {
        return res.status(400).json({ error: "User is not registered" });
      }}

      exports.login = async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await Rioadmin.findOne({ where: { email } });
        console.log(user)
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  else {
    let token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      SECRET,
      { expiresIn: "7 days" }
    );
    let result = {
      id: user.id,
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