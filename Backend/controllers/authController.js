import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

//router for registration

router.post('/register',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({msg:"User already Exists"});
        }
        //If doesnt Exists
        const hashedPassword =await bcrypt.hash(password,12)

        const newUser = new User({
            email,
            password: hashedPassword
        });
        //Saves new user to the db
        const savedUser = await newUser.save();

        const token = jwt.sign({id:savedUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(201).json({token,msg:'User registered successfully'});


    } catch(error){
       
    }
})

//route for user login

router.post('login',async(req,res)=>{
    try{
        const {email,password} =req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Invalid credentials'});

        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const payload ={
                id: user._id,
                email:user.email
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn:3600},
                (error,token)=>{
                    if(error) throw error;
                    res.json({
                        token,
                        user:{id:user._id,email:user.email}
                        
                    });
                }
            )
        } else{
            return res.status(400).json({msg:'Invalid Credentials'});
        }
    } catch(error){
        console.error(error);
        res.status(500).send('Server error');

    }
});

export {router as authRouter};