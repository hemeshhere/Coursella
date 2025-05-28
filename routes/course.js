const express = require("express");
const Router = express.Router;
const courseRouter = Router();

courseRouter.get("/purchase", (req,res)=>{
    res.json({
        message: "purchases endpoint"
    })
});

courseRouter.get("/preview", (req,res)=>{
    res.json({
        message: "courses endpoint"
    })
});

module.exports = {
    courseRouter: courseRouter
}