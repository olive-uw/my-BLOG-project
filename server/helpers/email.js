import dotenv from 'dotenv';
dotenv.config();
const{EMAIL_ADDRESS}=process.env


class Email{

    static welcomeEmail(user){
        return{
            to: user.email,
            subject:"wecome to Blogpost",
            html:`<div style="position: absolute; width: 100%; height: 100%; background-color: #f4f4f4;">
            <div style="display: flex; height: 120px; font-size: 25px;">
            <div>
            <h3 style="color: #FFAF00; margin-left: 20px; font-weight: 900;">SheCanCode Materials</h3>
            </div>
            </div>
            <div style="height: 60%; margin: auto; width: 94%; text-align: left; background-color: #ffff; -webkit-box-shadow: 5px 5px 5px 5px black; -moz-box-shadow: 5px 5px 5px 5px black; box-shadow: 5px 5px 5px 5px black;">
            <div style="height: 65%; padding: 10px;">
            <p>Hi ${user.firstName},</p>
            <p>welcome, to SheCanCode Blogpost. </p> </div>
            <div style="background-color: #f4f4f4; height: 25%; width: 100%; float: bottom; padding: 10px;">
            <p>If you have any issue, please reach out to us via our support email <a href="mailto:${EMAIL_ADDRESS}" target="_self"> SheCanCode BlogPost</a></p>
            </div>
            </div>
            </div>`
        }
    }
}
export default Email;