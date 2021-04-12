import UserData from '../model/UserModel';
import { generateAuthToken } from "../helpers/token";
import bcrypt from "bcrypt";
import EmailHelper from '../helpers/emailtemplete';
import Response from  '../helpers/response';



class UserController {
  //changing password

  static changePassword = async (req,res)=>{
    let{
      oldPassword,
      newPassword,
      comfirmPassword
    }= req.body;

    const userId=req.body.userId;
    const userDetails= await UserData.findById(userId)
    console.log(userDetails);
    if(!userDetails)
    return Response.errorMessage(res, "user not exist", 404);


    if (bcrypt.compareSync(oldPassword,userDetails.password)){
      if(newPassword===comfirmPassword){

        const password = bcrypt.hashSync(newPassword,10);
        const passwordChangeTime= Date.now();
        const userUpdate = await UserData.findByIdAndUpdate(userId, {
          password: password,
          passwordChangeTime:passwordChangeTime
        })
        return Response.successMessage(res,"success",userUpdate,200)

      }
      return Response.errorMessage(res,"please provide the confirm password that macth with new password",417)
    }
    return Response.errorMessage(res,"please provide the correct old password",417)
  }
    static signup = async (req, res) => {
      
        let {
            firstName,
            lastName,
            email,
            gender,
            password,
            role,
            department,
            address

        } = req.body;


        password = bcrypt.hashSync(password, 10)

        const isEmailExist = await UserData.findOne({email:email});

        if (isEmailExist) {

         return   Response.errorMessage(res,'email is duplicated',409)

           // return res.status(409).send({ statu: 409, error: "email is duplicated" })
        }
// console.log(req.body.password) // password is not hashed
       req.body.password= password;
        // console.log(req.body.password)//pasword is hashed
       const data = await UserData.create(req.body);



        if (!data) {

  return Response.errorMessage(res,'account created failed',417)
           // return res.status(417).json({
             //   status: 417,
             //   message: "signup failed",
          //  })
        }

        else {
            let { password, ...userData } = data._doc;
         await   EmailHelper.userWelcomeEmail(userData);

      return   Response.successMessage(res,"account created succesfully",userData,201)

          //  return res.status(201).json({
              //  status: 201,
             //   message: "Account created succesfully",
               // data: userData
          //  })
        }  


    }

    static signin = async (req, res) => {
        let { email, password } = req.body;
        const isUserExist =await UserData.findOne({email:email});
console.log(isUserExist)
        if (isUserExist && bcrypt.compareSync(password, isUserExist._doc.password)) {

            const data = isUserExist;

            const token = generateAuthToken({
                id: data.id,
                email: data.email,
                role: data.role
            });
          return  Response.successMessage(res,'login succesfully',{token},201)

        //    let { password, ...userData } = data;
            //return res.status(201).json({
               // status: 201,
              //  message: "Account Login succesfully",
               // token,
                //data: userData._doc
           // })
        }
       return  Response.errorMessage(res,'login failed',401)

       // return res.status(404).json({
           // status: 404,
           // message: "User not found!",

      //  })




    }



}

export default { UserController};