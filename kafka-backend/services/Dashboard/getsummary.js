"use strict";

const Transaction = require("../../Models/transactionModel");

function handle_request(msg, callback) {
  console.log("-----------------------GET SUMMARY----------------------");
  console.log("Message received for get summary kafka backend is:", msg);
  console.log("GroupName:", msg.groupname);
  console.log("created by:", msg.user1);
  console.log("members:", msg.members);
  const payer = msg.user1;
  const payee = msg.user2;

  if (msg.user1) {
    // Transaction.find({ user1: payer }, (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(result);
    //     // let takeAmount = 0;
    //     // for (let i = 0; i < result[0].length; i++) {
    //     //   takeAmount = takeAmount + result[0][i].amountperPerson;
    //     // }
    //     // console.log(takeAmount);
    //     // callback(null,takeAmount);
    //   }
    // });
    Transaction.aggregate([
      {
        $match: { user1: payer },
      },
      {
        $group: {
          _id: "$user1",
          takeAmount: { $sum: "$amountperPerson" },
        },
      },
    ], (err, result) => {
        if(err){
            console.log("server error:", err);
            callback(null, 500);
        }else{
          console.log(result)
            callback(null, result)
        }
    });
  } else if (msg.user2) {
    Transaction.aggregate(
      [
        {
          $match: { user2: payee },
        },
        {
          $group: {
            _id: "$user2",
            giveAmount: { $sum: "$amountperPerson" },
          },
        },
      ],
      (err, result) => {
        if (err) {
          console.log("server error:", err);
          callback(null, 500);
        } else {
          console.log(result)
          callback(null, result);
        }
      }
    );
  }
}

exports.handle_request = handle_request;
