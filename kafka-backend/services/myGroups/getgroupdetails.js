"use strict";

const Expense = require("../../Models/expenseModel");

function handle_request(msg, callback) {
  console.log("-----------------------GET GROUP DETAILS----------------------");
  console.log("Message received for group details kafka backend is:", msg);

//   let newExpense = new Expense({

//       members:msg.groupMembers,
//       groupName: msg.groupName,
//       expense: msg.expense,
//       transaction: msg.transaction,
//       entryType: msg.entryType
//   })

Expense.find({group_id : msg.group_id}).
populate('paidby').
exec(function(err,result){
    if(err){
        console.log(err);
        callback(null, 500);
    }else{
        console.log("Successfully!",result);
        
             callback(null, result);
    }
})

//   newExpense.save(newExpense, (err, result) => {
//           if (err) {
//             console.log("server error:", err);
//             callback(null, 500);
//           } else {
//             console.log("Expense Added Successfully!");
//             callback(null, 200);
//           }
//         });
}

exports.handle_request = handle_request;
