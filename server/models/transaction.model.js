const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    members : { type : Array},
    groupID : {type: Schema.Types.ObjectId, ref: 'Group'},
    expense : [
        {
            payee: {type: Schema.Types.ObjectId, ref: 'User'},
            description: { type: String},
            amount : { type: Int }
        }
    ],
    transaction : [
        {
            user1 : {type: Schema.Types.ObjectId, ref: 'User'},
            user2 : {type: Schema.Types.ObjectId, ref: 'User'},
            amountpp : { type: Int }
        }
    ]
});

module.exports = mongoose.model('Transaction', transactionSchema);