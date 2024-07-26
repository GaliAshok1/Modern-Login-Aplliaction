const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

//static file
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("loginApp");
});

app.get("/signup", (req, res) => {
    res.render("LoginApp");
});

app.get("/signin", (req, res) => {
    res.render("LoginApp");
});

//SignUp User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,

    }
    const alreadyUser = await collection.findOne({ email: data.email });
    if (alreadyUser) {
        res.send(`User mail already exists.`);
    }
    else {
        const salt=10;
        const hashedPassword= await bcrypt.hash(data.password,salt);
        data.password=hashedPassword;  //replacing hased password with the orginal one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.send("User Accout Created Successfully")
    }
});


//Login User

app.post("/signin", async(req,res)=>{
    try{
        const member=await collection.findOne({email:req.body.email});
        if(!member){
            res.send("Email id Cannot find, please Register");
        }
        const isPasswordMatch=await bcrypt.compare(req.body.password,member.password);
        if(isPasswordMatch){
            res.render("homepage");
        }
        else{
            res.send("Entered wrong password");
        }
    }catch{
        res.send("Wrong Details entered")
    }
});

app.listen(PORT, () => console.log(`Server Started on PORT: ${PORT}`));
