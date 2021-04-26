"use strict";
const Users = require("../../Models/userModel");

function handle_request(msg, callback) {
  console.log("inside get all user create group service kafka backend");
  console.log(msg)

  //Users.find({}, { email: 1, _id: 0 }, (err, allUsers) => {
  Users.find({email: {$ne: msg.email}}, (err, allUsers) => {
    console.log("get all user result is:", allUsers);

    if (err) {
      callback(null, 500);
    } else if (allUsers === null) {
      callback(null, 207);
    } else {
      callback(null, allUsers);
    }
  });
}

exports.handle_request = handle_request;
