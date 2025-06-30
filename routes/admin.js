const express = require("express");
const Router = express.Router;
const adminRouter = Router();
const {adminModel, courseModel}= require("../db");
const {adminMiddleware}=require("../middleware/admin");
// const {userMiddleware}=require("../middleware/user");
const { z }=require("zod");
const bcrypt=require("bcrypt"); 
const jwt=require("jsonwebtoken");
const course = require("./course");
const userJWT=process.env.JWT_ADMIN_PASSWORD;

adminRouter.post("/signup", async (req,res)=>{
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
            await adminModel.create({
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
                message:"admin already exists"
            })
        }
    }
    catch(e){
        res.json({
            message:"admin already exists"
        })
        errorThrow=true;
    }
});

adminRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    try {
        const admin=await adminModel.findOne({email});
        if(!admin){
            return res.status(403).json({
                message:"Incorrect Credentials"
            });
        }
        const passMatch=await bcrypt.compare(password,admin.password);
        if(!passMatch){
            return res.status(403).json({
                message:"Incorrect Credentials"
            });
        }
        const token = jwt.sign({
                id: admin._id.toString() 
        }, userJWT);
        res.json({
            message: "Signin successful to admin dashboard",
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

adminRouter.post("/course", adminMiddleware,async (req,res)=>{
    const adminId=req.userId;
    const { title, description, imageUrl, price }=req.body;
    const course= await courseModel.create({
        title: title, 
        description: description,
        imageUrl: imageUrl, //instead of using url we can directly upload img, which can be learnt from harkirat yt web3 saas in 6hrs
        price:price,
        creatorId: adminId
    })
    res.json({
        message: "Course Created",
        courseId: course._id
    })
});

adminRouter.put("/course/edit", adminMiddleware, async(req,res)=>{
    const adminId=req.userId;
    const { title, description, imageUrl, price, courseId }=req.body;

    const validCourse=await courseModel.findOne({
        _id: courseId,
        creatorId: adminId
    });
    if(!validCourse){
        return res.status(403).json({
            message:"Invalid course"
        });
    }
    const course= await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title, 
        description: description,
        imageUrl: imageUrl, 
        price:price,
        creatorId: adminId
    })
    res.json({
        message: "Course Updated",
        courseId: course._id
    })
});

adminRouter.get("/course/bulk", adminMiddleware,async (req,res)=>{
    const adminId=req.userId;
    const courses= await courseModel.find({
        creatorId: adminId
    });
    res.json({
        message: "Course Updated",
        courses
    })
});

module.exports={
    adminRouter: adminRouter
}