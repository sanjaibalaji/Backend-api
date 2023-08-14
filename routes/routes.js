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
route.get('/google',auth.gsign)

route.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));


route.get(
  '/auth/callback',
  passport.authenticate('google', { failureRedirect: '/login'}),
    async (req,res) => {
      try {
        req.user = { 
          token: "akjshsakfdshjsha", 
        };
        if (req.user) {
          const userData = req.user;
          const token = userData.token; 
          res.send( req.user );
        } else {
          res.redirect('/login');
        }
      } catch (error) {
        console.log(error);
        res.send({ message: "error" });
      }
    }

);

module.exports = route
