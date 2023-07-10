const auth = require('../controlllers/register-controller')
const auth1 = require('../controlllers/roles-controller')
const auth2 = require('../controlllers/subjectDetails-controller')
const auth3 = require('../controlllers/class-controller')
const auth4 = require('../controlllers/department-controller')
const auth5 = require('../controlllers/deptSubDetails-controller')
const auth6 = require('../controlllers/staffSubDetails-controller')
const auth7 = require('../controlllers/timetable-controller')
const auth8 = require('../controlllers/dept_staff_details-controller')

const passport=require("passport")
// const passport = require('../middlewares/passport')
const { jwtStrategy } = require('../middlewares/strategy');
// const verifyEmail = require('../controlllers/controller')
// const login =require('../controlllers/controller')
// const forgot_password =require('../controlllers/controller')
// const reset_password =require('../controlllers/controller')

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



//route.get('/google', (req, res) => {
 // res.send("<button><a href='/auth'>Login With Google</a></button>")
//});

// Auth 
route.get('/auth' , passport.authenticate('google', { scope:
  [ 'email', 'profile' ]
}));

// Auth Callback
route.get( '/auth/callback',
  passport.authenticate('google', {
      successRedirect: '/auth/callback/success',
      failureRedirect: '/auth/callback/failure'
}));

// Success 
route.get('/auth/callback/success' , (req , res) => {
  if(!req.user)
      res.redirect('/auth/callback/failure');
  res.send("Welcome " + req.user.email);
});

// failure
route.get('/auth/callback/failure' , (req , res) => {
  res.send("Error");
})


module.exports = route
