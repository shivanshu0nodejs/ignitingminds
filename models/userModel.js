const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    doc_num:{
        type: Number
    },
    name:{
        type: String,
        required: [true, "Please Enter Name"]
    },
    email:{
        type: String,
        required: [true, "Please Enter Email"]
    },
    phone:{
        type: Number,
        required: [true, "Please Enter Number"]
    },
    otp:{
        type: Number
    },    
    status:{
        type: Number
    }},{
        timestamps: true
     
});

module.exports = mongoose.model("User", userSchema);
