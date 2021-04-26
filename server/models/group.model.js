const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const groupSchema = new Schema({
    groupName:{
        type: String,
        required: true,
        min:6,
    },

    members : [
        {M_id: {type: Schema.Types.ObjectId, ref: 'User'}, invite : {type:Integer, default: 0 }}
      ],
 
});

module.exports = mongoose.model('Group', groupSchema);