"use strict";

const Comment = require("../../Models/commentModel");

function handle_request(msg, callback) {
  console.log("-----------------------Add Comment----------------------");
  console.log("Message received for add Comment kafka backend is:", msg);

  let newComment = new Comment({
      group_id: msg.group_id,
     
      expense_id:msg.expense_id,
      message:msg.message,
      userId:msg.userId,
      name:msg.name,
  })



  newComment.save(newComment, (err, result) => {
          if (err) {
            console.log("server error:", err);
            callback(null, 500);
          } else {
            console.log("Comment Added Successfully!",result);
            callback(null, 200);
          }
        });
    }

 exports.handle_request = handle_request;