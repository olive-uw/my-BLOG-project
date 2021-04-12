import { check, validationResult} from 'express-validator';
import blogData from "../model/blogModel";
class Validator{

    static verifyAccess = async (req,res,next)=>{

        const userIdFromToken = req.body.userId;
        const blogIdFromParams = req.params.id;

        const blog = await blogData.findById(blogIdFromParams);

        console.log(userIdFromToken)
        if(!blog){
            return res.status(404).json({
                status:404,
                message:"Blog not exist"
            })
        }

        else if(userIdFromToken == blog.userId._id){
            return next();
        }

        return res.status(401).json({
            status:401,
            message:"you are not Authorised"
        })



    }


  static validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessage = errors.errors.map((err) => err.msg);
      return       res.status(400).json({
        status: 400,
        error:errorMessage,
      });
    }
    return next();
  };

    static newAccountRules(){
            
        return [
            check("firstName", "first name should be valid").trim().isAlpha(),
            check("email","email should be existed").isEmail()
        ];
    }


}

export default Validator;