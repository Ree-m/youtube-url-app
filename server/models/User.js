const mongoose = require("mongoose");

const UserSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:8,
        required:true
    }
},{
    timestamps:true
})

module.exports =mongoose.model("User",UserSchema)