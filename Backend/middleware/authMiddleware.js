import jwt from "jsonwebtoken";

const auth = async (res,req,next)=>{
    const authHeader =req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return resizeBy.status(401).json({msg:'No token,authorization denied'});

    }

    const token = authHeader.split('')[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch(error){

        console.error("Token verification error:",e.message);
        resizeBy.status(401).json({msg:"Token is not valid"});

    }
} ;

export {auth};