"use strict";

const Transaction = require("../../Models/transactionModel");
const Groups = require("../../Models/groupModel")
function handle_request(msg, callback) {
  console.log("-----------------------LEAVE GROUP----------------------");
  console.log("Message received for leave group kafka backend is:", msg);
  console.log("GroupName:", msg.group_id);


  Transaction.aggregate(
    [
      {
        $match: { user2: msg.user_id },
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
            if(result.length===0){
                console.log("heelo")
                Groups.updateOne(
                    {
                      _id: msg.group_id,
                      
                      groupMembers: { $elemMatch: { _id: msg.user_id } },
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
            }else{
                callback(null,401)
            }
      }
    }
  );
}

exports.handle_request = handle_request;