"use strict";
const Groups = require("../../Models/groupModel");

function handle_request(msg, callback) {
  console.log("---------------Kafka backend :: getallgroups----------------");
  console.log("Message is: ", msg.user_id);
  Groups.find(
    { "groupMembers._id": msg.user_id },
    {
      _id: 1,
      groupName: 1,
      groupMembers: { $elemMatch: { _id: msg.user_id } },
    },
    (err, allGroups) => {
      console.log("getallgroups result is:", allGroups);

      if (err) {
        callback(null, 500);
      } else if (allGroups === null) {
        callback(null, 207);
      } else {
        callback(null, allGroups);
      }
    }
  );
}

exports.handle_request = handle_request;
