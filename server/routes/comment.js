const router = require('express').Router();
const kafka = require("../kafka/client");


router.post("/addComment", (req, res) => {
    console.log("inside postmethod for addcomment backend");
    console.log("req.body", req.body);
  
    kafka.make_request("addcomment", req.body, (err, result) => {
      console.log("comment details:", result);
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

  router.post("/deleteComment", (req, res) => {
    console.log("inside postmethod for delete comment backend");
    console.log("req.body", req.body);
  
    kafka.make_request("deletecomment", req.body, (err, result) => {
      console.log("comment details:", result);
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

  router.post("/getComment", (req, res) => {
    console.log("inside postmethod for addcomment backend");
    console.log("req.body", req.body);
  
    kafka.make_request("getcomment", req.body, (err, result) => {
      console.log("comment details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      }  else {
        res.send(result);
      }
    });
  });

  module.exports = router;