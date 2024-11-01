const { type } = require('express/lib/response');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please type Username"]
    },
    email:{
        type:String,
        required:[true,"Please add email address"],
        unique:[true,"Email Address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please add password"]
    }

},{timeStamp:true})

module.exports = mongoose.model("User", userSchema);