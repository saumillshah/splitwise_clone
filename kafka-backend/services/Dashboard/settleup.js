"use strict";

const Transaction = require("../../Models/transactionModel");

function handle_request(msg, callback) {
  console.log("-----------------------GET SUMMARY----------------------");
  console.log("Message received for get summary kafka backend is:", msg);

  console.log("created by:", msg.user2);

Transaction.deleteMany({user1:msg.user1, user2:msg.user2},(err,result)=>{
    console.log("result from settle up model kafka backend is:", result);
    if(err){
        console.log(err);
        callback(null, 500);
    }else{
        callback(null, result);
    }
})

}
exports.handle_request = handle_request;