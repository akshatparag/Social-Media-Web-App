const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true,
        unique: true
    },
    password:{
        type:String,
        required : true
    },
    name:{
        type:String,
        required : true
    }
}, {
    timestamp:true
}) ;

const User = mongoose.modell('User,userSchema');

module.exports = User;
