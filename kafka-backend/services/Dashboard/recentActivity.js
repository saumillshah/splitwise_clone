"use strict";
const Groups = require("../../Models/groupModel");
const Expense = require("../../Models/expenseModel");

function handle_request(msg, callback) {
  console.log("-----------------------GET Groups----------------------");
  console.log("Message received for get Groups kafka backend is:", msg);
  let data = [];
  console.log("created by:", msg.user2);

  Groups.find(
    { "groupMembers._id": msg.user_id, "groupMembers.invite": 1 },
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
        for (let i = 0; i < allGroups.length; i++) {
          console.log(allGroups[i]._id);
          data.push(allGroups[i]._id);
        }
        console.log(data);

        Expense.find({ group_id: { $in: data } })
          .sort({ createdAt: -1 })
          .populate("paidby")
          .populate("group_id")
          .exec((err, result) => {
            if (err) {
              callback(null, 500);
            } else {
              console.log(result);
              callback(null, result);
            }
          });
      }
    }
  );
}
exports.handle_request = handle_request;
