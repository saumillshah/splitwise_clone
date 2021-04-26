const mongoose = require("mongoose");
var connection = new require("./kafka/Connection");
//var database = require("./database");
const URI =
  "mongodb+srv://Saumil123:Saumil123@cluster0.8e0yq.mongodb.net/Splitwise?retryWrites=true&w=majority";

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};
const mongoConnection = async () => {
  await mongoose.connect(URI, options, (err, res) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};

mongoConnection();
//topics files

let user_login = require("./services/authentication/user_login");
let signup = require("./services/authentication/signup");
let getuser = require("./services/UserProfile/getuser");
let updateuser = require("./services/UserProfile/updateuser");
let image = require("./services/UserProfile/images");
let getallusers = require("./services/createGroup/getallusers");
let addgroup = require("./services/createGroup/addgroup");
let getgroups = require("./services/myGroups/getGroups");
let joingroup = require("./services/myGroups/joingroup");
let getgroupmembers = require("./services/myGroups/showGroups");
let addexpense = require("./services/myGroups/addexpense");
let getgroupdetails = require("./services/myGroups/getgroupdetails");
let getsummary = require("./services/Dashboard/getsummary");
let settleup= require("./services/Dashboard/settleup")
let leave = require("./services/myGroups/leavegroup")
let addcomment = require("./services/comments/addcomment")
let deletecomment = require("./services/comments/deletecomment")
let getcomment = require("./services/comments/getcomment")
let recentactivity = require("./services/Dashboard/recentActivity")

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    console.log("123", data.data);
    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

function response(data, res, producer) {
  console.log("after handle", res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
      }),
      partition: 0,
    },
  ];
  producer.send(payloads, function (err, data) {
    //console.log('producer send', data);
    if (err) {
      console.log("Error when producer sending data", err);
    } else {
      console.log(data);
    }
  });
  return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("user_login", user_login);
handleTopicRequest("signup", signup);
handleTopicRequest("getuser", getuser);
handleTopicRequest("updateuser", updateuser);
// handleTopicRequest("image", image);
handleTopicRequest("getallusers", getallusers);
handleTopicRequest("addgroup", addgroup);
handleTopicRequest("getgroups", getgroups);
handleTopicRequest("joingroup", joingroup);
handleTopicRequest("getgroupmembers", getgroupmembers);
handleTopicRequest("addexpense", addexpense);
handleTopicRequest("getsummary", getsummary);
handleTopicRequest("getgroupdetails", getgroupdetails);
handleTopicRequest("settleup", settleup);
handleTopicRequest("leave", leave);
handleTopicRequest("addcomment", addcomment);
handleTopicRequest("deletecomment", deletecomment);
handleTopicRequest("getcomment", getcomment);
handleTopicRequest("recentactivity", recentactivity);