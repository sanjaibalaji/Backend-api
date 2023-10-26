const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../controlllers/register-controller')
const auth1 = require('../controlllers/roles-controller')
const auth2 = require('../controlllers/subjectDetails-controller')
const auth3 = require('../controlllers/class-controller')
const auth4 = require('../controlllers/department-controller')
const auth5 = require('../controlllers/deptSubDetails-controller')
const auth6 = require('../controlllers/staffSubDetails-controller')
const auth7 = require('../controlllers/timetable-controller')
const auth8 = require('../controlllers/dept_staff_details-controller')
const auth9 = require('../controlllers/dayorderallotment-controller')
const auth10 = require('../controlllers/staffTimetable-controller')
const auth11 = require('../controlllers/examDetails-controller')
const auth12 = require('../controlllers/marksUpload-controller')
const auth13 = require('../controlllers/eventUpload-controller')
const  { fuleUpload }  = require('../middlewares/fileUpload');


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
route.get('/mytimetable',auth10.staffmytimetable)
route.get('/stafftimetable',auth10.stafftimetable)
route.get('/allstafftimetable',auth10.allstafftimetable)
route.get('/deptsublist',auth5.deptsubjectlist)
route.post('/updatetimetable',auth7.updatetimetable)
route.post('/studenttimetable',auth9.studenttimetable)
route.post('/datestudenttimetable',auth9.datestudenttimetable)
route.post('/createexam',auth11.examtypes)
route.get('/getexamtypes',auth11.getexamtypes)
route.post('/marksupload', upload.single('file'), auth12.marksupload);
route.post('/eventupload', fuleUpload.single('file'),auth13.eventsupload );
route.post('/getevent', fuleUpload.single('file'),auth13.geteventsupload );

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
