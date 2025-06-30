const jwt=require("jsonwebtoken");
function userMiddleware(req,res,next){
    const token= req.headers.token;
    const decoded=jwt.verify(token,process.env.JWT_USER_PASSWORD);
    if(decoded){
        req.userId=decoded.indexOf;
        next();
    }
    else{
        res.status(403).json({
            message:" User not signed in"
        });
    }
}

module.exports={
    userMiddleware: userMiddleware
}