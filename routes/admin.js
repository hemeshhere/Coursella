const express = require("express");
const Router = express.Router;
const adminRouter = Router();
const { adminModel }= require("../db");

adminRouter.post("/signup", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
});

adminRouter.post("/signin", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
});

adminRouter.post("/course", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
});

adminRouter.post("/course", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
});

adminRouter.post("/course/bulk", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
});

module.exports={
    adminRouter: adminRouter
}