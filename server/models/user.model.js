const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        min:6,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min:6,
    },
    phone_number:{
        type: Number,
    },
    timezone:{
        type: String,
    },
    language:{
        type: String,
    },
    currency:{
        type: String,
    }

});

userSchema.pre('save',function(next){
    if(!this.isModified('password')){
        return next();
    }else{
        bcrypt.hash(this.password,10,(err, passwordHash)=>{
            if(err){
                return next(err);
            }else{
                this.password= passwordHash;
                next();
            }
        }) 
    }

})

userSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if(err){
            return cb(err);
        }else{
            if(!isMatch){
                return cb(null, isMatch);
            }else{
                return cb(null, this)
            }
        }
    });
}

module.exports = mongoose.model('User', userSchema);