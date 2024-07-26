const mongoose = require("mongoose");


const User=mongoose.connect("mongodb://localhost:27017/loginDB")

//check db connected or not

User.then(()=>{
    console.log("MongoDB Connected");
}).catch(()=>{
    console.log("Not Connected");
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
});

const model=new mongoose.model("users",userSchema);
module.exports=model;