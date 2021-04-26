const router = require('express').Router();
const kafka = require("../kafka/client");


router.post("/addgroup", (req, res) => {
    console.log("inside postmethod for create group backend");
    console.log("req.body", req.body);
  
    kafka.make_request("addgroup", req.body, (err, result) => {
      console.log("group details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      } else if (result === 299) {
        res.writeHead(299, {
          "Content-Type": "text/plain",
        });
        res.end("GROUP_EXISTS");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Success");
      }
    });
  });
  
  router.post("/creategroup/getUser", (req, res) => {
    console.log("inside get User details create groups in node backend");
    kafka.make_request("getallusers", req.body, (err, result) => {
      console.log("user details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      } else if (result === 207) {
        res.writeHead(207, {
          "Content-Type": "text/plain",
        });
        res.end("NO_USER_DETAILS");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(result));
      }
    });
  });
  

  router.post("/getgroups", (req, res) => {
    console.log("inside getGroup backend");
    console.log("req.body : ", req.body);
    kafka.make_request("getgroups", req.body, (err, result) => {
      console.log("group details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      } else if (result === 207) {
        res.writeHead(207, {
          "Content-Type": "text/plain",
        });
        res.end("NO_GROUPS");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(result));
      }
    });
  });

  router.post("/getgroupdetails", (req, res) => {
    console.log("inside getGroupdetails backend");
    console.log("req.body : ", req.body);
    kafka.make_request("getgroupdetails", req.body, (err, result) => {
      console.log("group details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(result));
      }
    });
  });
  
  router.post("/acceptinvite", (req, res) => {
    console.log("inside join groups backend");
    console.log("req.body : ", req.body);
    kafka.make_request("joingroup", req.body, (err, result) => {
      console.log("join group details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Accepted");
      }
    });
  });

  router.post("/leave", (req, res) => {
    console.log("inside leave group backend");
    console.log("req.body : ", req.body);
    kafka.make_request("leave", req.body, (err, result) => {
      console.log("leave group details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      }
        else if(result === 401){
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Clear dues");
        }
       else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Accepted");
      }
    });
  });

module.exports = router;