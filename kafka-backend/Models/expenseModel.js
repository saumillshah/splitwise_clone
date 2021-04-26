const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    // members: { type: Array },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
    
        paidby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        email: String,
        description: { type: String },
        amount: { type: Number },
        // comments: [
        //   {
        //     message: { type: String },
        //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        //     username: { type: String },
        //     msgCreatedAt: { type: Date },
        //   },
        // ],
     
    // transaction: [
    //   {
    //     payee: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    //     borrower: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    //     amountPerPerson: { type: Number },
    //   },
    // ],
    createdAt: { type: Date, default: Date.now() },
    entryType: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("expense", expenseSchema);
