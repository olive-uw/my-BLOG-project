import {dataFromToken} from "../helpers/token";
import userController from "../controller/AuthController";
import userInfos from '../model/UserModel'

export const verifyAuth = (req,res,next)=>{

    const token = req.header("x-auth-token");
    if(!token){
        return res.status(404).json({
            status:404,
            errror: "No Token provided"
        })
    }

    try{

        const user = dataFromToken(token).payload;
    
        const data = userInfos.findById(user.id)
    
        if(!data){
            return res.status(404).json({
                status:404,
                error:"you are not a user"
            })
        }
        if(user.passwordChangeTime!=data.passwordChangeTime){
            return Response.errorMassage(res,"please re - login your account using new password",417)
        }
    // console.log(data)
    
        req.body.userId =user.id;
    
        return next();
    
    
    }catch(e){
        return res.status(404).send({
            Status: 404,
            Error: 'invalid token',
    
          });
    }





}