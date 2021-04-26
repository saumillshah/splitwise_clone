"use strict";
const Users = require("../../Models/userModel");
const Groups = require("../../Models/groupModel");

function handle_request(msg, callback) {
  console.log("----------kafka backend: JOIN GROUP-----------");
  console.log("Message received for join group kafka backend is:", msg);
  console.log("GroupName:", msg.groupName);
  console.log("groupId:", msg.group_id);
  console.log("groupMember:", msg.currentUser);

if(msg.status === "Accept"){

  Groups.updateOne(
    {
      _id: msg.group_id,
      
      groupMembers: { $elemMatch: { _id: msg.currentUser } },
    },
    { $set: { "groupMembers.$.invite": 1 } },
    (err, result) => {
      console.log("result from group model kafka backend is:", result);
      if (err) {
        console.log(err);
        callback(null, 500);
      } else {
        console.log("updated group:", result);
        callback(null, 200);
      }
    }
    );
  }
  else if(msg.status === "Decline"){
    Groups.updateOne(
      {
        _id: msg.group_id,
        
        groupMembers: { $elemMatch: { _id: msg.currentUser } },
      },
      { $set: { "groupMembers.$.invite": 2 } },
      (err, result) => {
        console.log("result from group model kafka backend is:", result);
        if (err) {
          console.log(err);
          callback(null, 500);
        } else {
          console.log("updated group:", result);
          callback(null, 200);
        }
      }
      );
  }
}

exports.handle_request = handle_request;
