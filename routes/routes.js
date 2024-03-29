const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const authenticateToken = require('../middlewares/token-validation')
const roleAccess = require('../middlewares/access')

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
const auth14 = require('../controlllers/dashboard-controller')
const auth15 = require('../controlllers/leaveOnduty-controller')
const auth16 = require('../controlllers/venue-controller')
const auth17 = require('../controlllers/rioadmin-controller')
const auth18 = require('../controlllers/rioadminDashboard-controller')
const auth19 = require('../controlllers/new_college_registration-controller')
const auth20 = require('../controlllers/collegeadminDashboard-controller')

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
route.post('/logout',auth.logout)
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
route.post('/updatetimetable',auth7.updatetimetable) //hold
route.post('/studenttimetable',auth9.studenttimetable)
route.post('/datestudenttimetable',auth9.datestudenttimetable)
route.post('/createexam',auth11.examtypes)
route.get('/getexamtypes',auth11.getexamtypes)
// marksupload api accessible for only staff
// route.post('/marksupload',authenticateToken,roleAccess.checkRole(['ST']), upload.single('file'), auth12.marksupload);
route.post('/marksupload', upload.single('file'), auth12.marksupload);
// eventupload api accessible for only staff
route.post('/eventupload', fuleUpload.single('file'),auth13.eventsupload );
route.post('/upcomingevent', fuleUpload.single('file'),auth13.upcomingevent );
route.post('/finishedevent', fuleUpload.single('file'),auth13.finishedevent );
route.post('/createdashboard',auth14.createdashboard);
route.post('/dashboard',auth14.getdashboard)
route.post('/leave',auth15.leave)
route.post('/onduty',auth15.onduty)
route.post('/getleavelist',auth15.getleavelist)
route.post('/leavedetails',auth15.getleavedetails)
route.post('/forms',auth.forms)
route.delete('/deleteevent',auth13.deleteevent)
route.post("/venue", auth16.venue);
route.get("/venuelist",auth16.venuelist)
route.post("/rioadmin_register",auth17.register)
route.post("/rioadmin_login",auth17.login)
route.post("/rioadmin_logout",auth17.logout)
route.post("/rioadmin_createdashboard",auth18.createdashboard)
route.post("/rioadmin_dashboard",auth18.getdashboard)
route.post("/rioadmin_newcollegeregister",auth19.collegeregistration)
route.post("/collegeadmin-createdashboard",auth20.createdashboard)
route.post("/collegeadmin-dashboard",auth20.getdashboard)



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
