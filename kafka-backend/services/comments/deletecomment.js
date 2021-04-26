"use strict";

const Comment = require("../../Models/commentModel");

function handle_request(msg, callback) {
  console.log("-----------------------Add expense----------------------");
  console.log("Message received for add expense kafka backend is:", msg);


  Comment.deleteOne({_id: msg.commentid},(err,result)=>{
      if(err){
          console.log(err)
          callback(null,500)
      }else{
          callback(null,result)
      }
  })
}

 exports.handle_request = handle_request;