const router = require('express').Router();
const kafka = require("../kafka/client");



router.post("/split", (req, res) => {
    console.log("inside postmethod for split backend");
    console.log("req.body", req.body);
  
    kafka.make_request("addexpense", req.body, (err, result) => {
      console.log("group details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      }  else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Success");
      }
    });
  });
  

  router.post("/getSummary",(req,res)=>{
    console.log("inside postmethod for getsummary backend");
    console.log("req.body", req.body);
    kafka.make_request("getsummary", req.body, (err, result) => {
        console.log("summary details:", result);
        if (result === 500) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("SERVER_ERROR");
        }  else {
          // res.writeHead(200, {
          //   "Content-Type": "text/plain",
          // });
          res.send(result);
        }
      });
  })

   router.post("/settleup",(req,res)=>{
    kafka.make_request("settleup", req.body, (err, result) => {
      console.log("settle up details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      }  else {
        // res.writeHead(200, {
        //   "Content-Type": "text/plain",
        // });
        res.send(result);
      }
    });
   })

   
   router.post("/recentActivity",(req,res)=>{
    kafka.make_request("recentactivity", req.body, (err, result) => {
      console.log("recentActivity details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      }  else {
        // res.writeHead(200, {
        //   "Content-Type": "text/plain",
        // });
      console.log(result)
      res.send(result)
      }
    });
   })

  module.exports = router;