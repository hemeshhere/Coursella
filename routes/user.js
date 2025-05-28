const express= require("express");
const Router= express.Router;  // OR const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
});

userRouter.post("/signin", (req,res)=>{
    res.json({
        message: "sigin endpoint"
    })
});

userRouter.get("/purchases", (req,res)=>{
    res.json({
        message: "purchases endpoint"
    })
});

module.exports = {
    userRouter: userRouter 
}