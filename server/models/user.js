const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true,
        min: [0, "Age must be a positive number"],
    },
    gender : {
        type : String,
        required : true,
        enum: ["male", "female"]
    },
    profile : {
        type : String,
    },
    token : {
        type : String,
    }
}, { timestamps: true });

const User = mongoose.model("user", userschema);

module.exports = User;