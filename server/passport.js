var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const Users = require("./models/user.model");

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      console.log("jwt_payload", jwt_payload);
      const user_id = jwt_payload._id;
      Users.findById(user_id, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });




// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const User = require('./models/user.model');


// const cookieExtractor = req =>{
//     let token = null;
//     if(req && req.cookies){
//         token = req.cookies["access_token"]
//     }
//     return token;
// }

// passport.use(new JwtStrategy({
//     jwtFromRequest: cookieExtractor,
//     secretOrKey : "cmpe273lab2"
// },(payload,done)=>{
//     User.findById({_id : payload.sub}, (err,user)=>{
//         if(err)
//             return done(err,false);
//         if(user)
//             return done(null,user);
//         else
//             return done(null,false);
//     })
// }));

// //authenticated local strategy using username and password

// passport.use(new LocalStrategy((email, password, done)=>{
//     User.findOne({email},(err,user)=>{
//         //something went wrong with database
//         if(err)
//             return done(err);
//         //if no user exist
//         if(!user)
//             return done(null,false);
//         //check if password is correct
//         user.comparePassword(password, done);
//     })
// }))