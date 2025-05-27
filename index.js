const express = require("express");
const app = express();

app.post("/user/signup", (req,res)=>{
    res.json({
        message: "signup endpoint"
    })
});

app.post("/user/signin", (req,res)=>{
    res.json({
        message: "sigin endpoint"
    })
});
 
app.get("/user/purchases", (req,res)=>{
    res.json({
        message: "purchases endpoint"
    })
});

app.get("/course/purchase", (req,res)=>{
    res.json({
        message: "purchases endpoint"
    })
});

app.get("/courses", (req,res)=>{
    res.json({
        message: "courses endpoint"
    })
});

app.listen(3000);