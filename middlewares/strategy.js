const passport =require('passport');
const JWT = require('jsonwebtoken');
const { SECRET } = require("../config");

var JWTSign = function(user, date){
    return JWT.sign({
        iss :"Collage",
        sub : user.id,
        iat : date.getTime(),
        exp : new Date().setMinutes(date.getMinutes() + 30)
    },SECRET);
}

 var jwtStrategy = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        console.log(err,user,info,"sassssssss");
        let contype = req.headers['content-type'];
        var json = !(!contype || contype.indexOf('application/json') !== 0);
        if (err) { return next(err); }
        if (err && err == 'expired'){ return json?res.status(500).json({ errors: ['Session is expired']}):res.redirect('/logout'); }
        if (err && err == 'invalid'){ return json?res.status(500).json({ errors: ['Invalid token recieved']}):res.redirect('/logout'); }
        if (err && err == 'user'){ console.log('1'); return json?res.status(500).json({ errors: ['Invalid user recieved']}):res.redirect('/logout'); }
      //  if (err && Object.keys(err).length) { return res.status(500).json({ errors: [ err ]}); }
        if (err) { console.log(err); return res.status(500).json({ errors: [ 'Invalid user recieved' ]}); }
        if (!user) { return json?res.status(500).json({ errors: ['Invalid user recieved']}):res.json("Token is not valid"); }
        
        //Update Token
        var date = new Date();
        var token = JWTSign(user, date);
        res.cookie('XSRF-token', token, {
            expire: new Date().setMinutes(date.getMinutes() + 30),
            httpOnly: true, secure:false
        });

        req.user = user;
        next();
    })(req, res, next);
};

 var jwtLogoutStrategy = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if(user){
            req.user = user;
        }
        next();
    })(req, res, next);
};

 var localStrategy = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err && err.startsWith("isNewUser")) { var email = err.split("/"); return res.status(200).json({ isnewuser: 1, email: email[1] }); }
        if (err && err == 'invalid') { return res.status(500).json({ errors: ['Email Id not verified']}); }
        if (err && err == 'attempt') { return res.status(500).json({ errors: ['Too many invalid attempts. Please reset your password.']}); }
        if (err && err.startsWith('attempt:')) { return res.status(500).json({ errors: ['Invalid Credentials (' + err.split(':')[1]+' Attempt(s) Left)']}); }
        if (err) { return res.status(500).json({ errors: [ err ]}); }
        if (!user) { return res.status(500).json({ errors: ['Invalid Credentials']}); }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports={localStrategy,jwtLogoutStrategy,jwtStrategy}