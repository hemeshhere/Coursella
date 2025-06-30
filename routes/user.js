const express= require("express");
const Router= express.Router;  // OR const { Router } = require("express");
const {userModel} = require("../db")
const { z }=require("zod");
const { tr } = require("zod/v4/locales");
const userRouter = Router();
const bcrypt=require("bcrypt"); 
const jwt=require("jsonwebtoken");
const { userMiddleware } = require("../middleware/user");
const userJWT=process.env.JWT_USER_PASSWORD;

userRouter.post("/signup", async(req,res)=>{
    const {email, password, firstName, lastName} = req.body; 

    //---ZOD USED FOR VALIDATION
    const requiredBody=z.object({
        email:z.string().min(3).max(100).email(),
        firstName:z.string().min(2).max(30),               
        lastName:z.string().min(2).max(30),               
        password:z.string().min(6).max(8)
    })
    const parsedWithSuccess=requiredBody.safeParse(req.body);    

    if(!parsedWithSuccess.success){
        res.json({
            message: "Incorrect format",
            error: parsedWithSuccess.error
        })
        return
    }

    //--->HASHING THE PASSWORD
    let errorThrow= false;
    try {  
        const hashedPass=await bcrypt.hash(password,5);
        console.log(hashedPass);
        try{
            await userModel.create({
                email: email,   //OR email, can work as email: email
                password: hashedPass,
                firstName: firstName,
                lastName: lastName
            })
            res.json({
                message: "signup done"
            })
        }
        catch(e){
            res.json({
                message:"user already exists"
            })
        }
    }
    catch(e){
        res.json({
            message:"user already exists"
        })
        errorThrow=true;
    }


    // res.json({
    //     message: "signup endpoint"
    // })
});

userRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(403).json({
                message:"Incorrect Credentials"
            });
        }
        const passMatch=await bcrypt.compare(password,user.password);
        if(!passMatch){
            return res.status(403).json({
                message:"Incorrect Credentials"
            });
        }
        const token = jwt.sign({
                id: user._id.toString() 
        }, userJWT);
        res.json({
            message: "Signin successful",
            token: token
        })
    } 
    catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Server error" 
        });
    }
});

userRouter.get("/purchases",userMiddleware,async (req,res)=>{
    const userId=req.userId;
    const purchases=await purchaseModel.find({
        userId,
        courseId
    });
    res.json({
        purchases
    })
});

module.exports = {
    userRouter: userRouter 
}