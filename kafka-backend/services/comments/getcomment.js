"use strict";

const Comment = require("../../Models/commentModel");

function handle_request(msg, callback) {
  console.log("-----------------------get comment----------------------");
  console.log("Message received for add expense kafka backend is:", msg);




 Comment.find({expense_id: msg.expenseID}, (err, result) => {
          if (err) {
            console.log("server error:", err);
            callback(null, 500);
          } else {
            console.log("Get comment Successfully!",result);
            callback(null, result);
          }
        });
    }

 exports.handle_request = handle_request;