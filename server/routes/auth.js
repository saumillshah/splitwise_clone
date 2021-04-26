const router = require('express').Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user.model')


const kafka = require("../kafka/client");

router.post("/signup", (req, res) => {
  kafka.make_request("signup", req.body, (err, result) => {
    console.log("Created user Details:",result)
    if (result === 500) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Server Side Error");
    } else if (result === 299) {
      res.writeHead(299, {
        "Content-Type": "text/plain",
      });
      res.end("USER_EXISTS");
    } else  {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});


const { auth } = require("../passport");
const { secret } = require("../config");
auth();

router.post("/login", (req, res) => {
  console.log("inside login backend",req.body);
  kafka.make_request("user_login", req.body, (err, result) => {
    console.log("result is:", result);
    if (err) {
      console.log(err);
    } else {
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Server Side Error");
      } else if (result === 207) {
        res.writeHead(207, {
          "Content-Type": "text/plain",
        });
        res.end("NO_USER");
      }  else if (result === 501) {
        res.writeHead(207, {
          "Content-Type": "text/plain",
        });
        res.end("BCRYPT");
      }else if (result === 209) {
        res.writeHead(209, {
          "Content-Type": "text/plain",
        });
        res.end("INCORRECT_PASSWORD");
      } else {
        const payload = { _id: result._id, source: "customer" };
        const token = JWT.sign(payload, secret, {
          expiresIn: 1008000,
        });
        result.token = "JWT " + token;
        //
        res.cookie("cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        res.writeHead(200, {
          "Content-Type": "applicaton/json",
        });
        console.log("Result sending to frontend:", JSON.stringify(result));
        res.end(JSON.stringify(result));
      }
    }
  });
});
module.exports = router;


// const signToken = userID => {
//     return JWT.sign({
//         iss : "cmpe273lab2",
//         sub : userID
//     }, "cmpe273lab2",{expiresIn:"1h"})
// }

// router.post('/signup', async (req,res)=>{
//   console.log(req.body)
//     const name= req.body.name;
//     const email=req.body.email;
//     const password=req.body.passwd;

//     const check = await User.findOne({email}, (err,user)=>{
//         // if(err)
//         //     res.status(500).json({message:{msgbody:"Error has occures"}})
//         // if(user)
//         //     res.status(500).json({message:{msgbody:"User Exist"}})
//         // else{
//         const user1 = new User({name, email, password})
//         try{
//             const savedUser =  user1.save();
//             res.send(savedUser)
//         }catch(err){
//             res.status(400).send(err);
//         }
//       // }
//     })
// });

// router.post('/login',passport.authenticate('local',{session: false}),(req,res)=>{
//     if(req.isAuthenticated()){
//         const {_id, email} = req.user
//         const token = signToken(_id);
//         res.cookie('accss_token', token,{httpOnly: true, sameSite:true})
//         res.send(200).json({isAuthenticated:true, user :{email}})
//     }
// })

// router.get('/logout',passport.authenticate('jwt',{session: false}),(req,res)=>{
//    res.clearCookie('access_token')
//    res.json({user:{email:""},success : true})
// })

// module.exports = router;