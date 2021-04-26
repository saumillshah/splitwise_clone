const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema(
    {
    
      group_id: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
        expense_id : {type: mongoose.Schema.Types.ObjectId, ref: "expense"},
              message: { type: String },
              userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
              name: { type: String },
              msgCreatedAt: { type: Date, default: Date.now() },
        
    },
    {
      versionKey: false,
    }
  );
  
  module.exports = mongoose.model("comment", commentSchema);