"use strict";
const Users = require("../../Models/userModel");
const Group = require("../../Models/groupModel");
const Expense = require("../../Models/expenseModel");
const Transaction = require("../../Models/transactionModel");

function handle_request(msg, callback) {
  console.log("-----------------------Add expense----------------------");
  console.log("Message received for add expense kafka backend is:", msg);

  let newExpense = new Expense({
      group_id: msg.group_id,
     
      paidby:msg.dataarray[0].paidby,
      email:msg.dataarray[0].email,
      description:msg.dataarray[0].description,
      amount:msg.dataarray[0].amount,
      
      // transaction: msg.transaction,
      // entryType: msg.entryType
  })



  newExpense.save(newExpense, (err, result) => {
          if (err) {
            console.log("server error:", err);
            callback(null, 500);
          } else {
            console.log("Expense Added Successfully!");
            // callback(null, 200);
          }
        });






console.log(msg)
  Group.findOne({ _id: msg.group_id }, (err, groups) => {
    if (err) {
      console.log(err);
    } else {
      console.log(groups);
     let groupmembers = groups.groupMembers;
     let num_members = 0;
      for (let i = 0; i < groupmembers.length; i++) {
        if (groupmembers[i].invite === 1) {
          num_members++;
        }
      }

      let amt_each = msg.dataarray[0].amount / num_members;

      for (let i = 0; i < groupmembers.length; i++) {
        if (groupmembers[i].invite === 1) {
          console.log("ids",groupmembers[i]._id)
          console.log("ids",msg.dataarray[0].paidby)
          if (groupmembers[i]._id != msg.dataarray[0].paidby) {
        
            console.log(groupmembers[i]._id !== msg.dataarray[0].paidby)
            let newtransaction = new Transaction({
              group_id: msg.group_id,
              user1: msg.dataarray[0].email,
              user2: groupmembers[i].email,
              amountperPerson: amt_each,
            });
            newtransaction.save(newtransaction, (err,result)=>{
              if(err){
                console.log(err)
              }else{
                callback(200,result)
              }
            })
            
          }
        }
      }
    }
  });
 
  
}



exports.handle_request = handle_request;
