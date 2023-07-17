const passport = require('passport');
const auth = require('../controlllers/register-controller')
const auth1 = require('../controlllers/roles-controller')
const auth2 = require('../controlllers/subjectDetails-controller')
const auth3 = require('../controlllers/class-controller')
const auth4 = require('../controlllers/department-controller')
const auth5 = require('../controlllers/deptSubDetails-controller')
const auth6 = require('../controlllers/staffSubDetails-controller')
const auth7 = require('../controlllers/timetable-controller')
const auth8 = require('../controlllers/dept_staff_details-controller')

const db = require('../models')
const Register = db.register
const { jwtStrategy } = require('../middlewares/strategy');
const register = require('../models/register');


var route = require("express").Router();


route.post("/register", auth.register);
route.post("/role", auth1.role);
route.get("/rolelist",auth1.rolelist)
route.post('/create_password', auth.verifyEmail)
route.post('/login',auth.login)
route.post('/forgot_password',auth.forgotPassword)
route.post('/reset_password',auth.resetPassword)
route.post('/subjects',auth2.subjects)
route.post('/class',auth3.classes)
route.post('/department',auth4.department)
route.post('/deptsubdetails',auth5.deptsubdetails)
route.post('/staffsubdetails',auth6.staffsubdetails)
route.post('/timetable',auth7.timetable)
route.get('/timetablelist',auth7.getTimetableList)
route.get('/departmentlist',auth4.departmentlist)
route.get('/departmentbatchlist',auth4.departmentbatchlist)
route.post('/deptstaff',auth8.deptStaff)
route.get('/classlist',auth3.classlist)
route.get('/deptstafflist',auth8.deptstafflist)
route.get('/staffsubjectlist',auth6.staffsubjectlist)

// Set up routes

// Initiates the Google OAuth authentication
route.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

route.get(
  '/auth/callback',
  passport.authenticate('google', { failureRedirect: '/login'}),
    // successRedirect: '/profile',
    async (req,res) => {
      try{
        const email = req.user.emails[0].value;
        const user = await Register.findOne({where:{email}});

        if(user) {
          res.send({message:"user available",user})
        } else {
          res.redirect('/login');
        }
      } catch (error) {
        res.send ({message:"error"});
      }
    }

);

// // Route for the user profile page
// route.get('/profile', (req, res) => {
//     console.log(req.user.emails)
//   res.send('Welcome, ' + req.user.displayName +' '+ req.user.emails[0].value);
// });

// Route for the login page
// route.get('/login', (req, res) => {
//   res.send('Please login with Google.');
// });

module.exports = route
