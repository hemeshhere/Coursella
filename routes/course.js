const express = require("express");
const Router = express.Router;
const courseRouter = Router();
const {userMiddleware}=require("../middleware/user");
const {purchaseModel, courseModel}=require("../db");

courseRouter.get("/purchase",userMiddleware, async(req,res)=>{
    const userId=req.userId;
    const courseId=req.body.courseId;
    
    //should check that whether the payment has done

    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        message: "You have successfully purchased a course"
    })
});

courseRouter.get("/preview", async (req,res)=>{
    const courses= await courseModel.find({});
    res.json({
        courses
    })
});

module.exports = {
    courseRouter: courseRouter
}