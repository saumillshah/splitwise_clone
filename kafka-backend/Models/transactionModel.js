const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = Schema({
  group_id: {
     type: mongoose.Schema.Types.ObjectId, ref: "group",
    required: true,
  },

  user1: {
     type: String ,
    required: true,
  },

  user2: {
    type: String ,
    required: true,
  },

  amountperPerson: {type: Number, require: true},
  
},  {
  versionKey: false,
});

module.exports = mongoose.model("transaction", TransactionSchema);