//1 import userschema or  model

const users = require('../Models/userSchema')

//import json_web_token
const jwt=require('jsonwebtoken')


//register logic
exports.register = async (req, res) => {
    //accept data from client
    console.log("Inside Register Method");
    const {username,email,password}= req.body
    console.log(username,email,password);
    try {
        //check is the email is already exist
        const existingUser=await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User Already Registred")
        }
        else{
            const registerData = new users({username,email,password,github:"",livelink:"",profile:""})
           await registerData.save()
           res.status(200).json(registerData)
        }  
    }
    catch (error) {
        res.status(500).json("Registration Failed")
    }
}

//login logic
exports.login=async(req,res)=>{
    //accept data from the user
    const{email,password}=req.body
    try{
        //check if email and password is in db
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            //creating token
            const token=jwt.sign({userId:existingUser._id},"super2024")
            console.log(token);
            //giving this to frontend
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json("Invalid Email or Password")
        }
    }
    catch(error){
        res.status(500).json("Registration Failed..."+error)
    }
}


