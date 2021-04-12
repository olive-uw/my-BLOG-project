import commentInfo from '../model/commentModel';
import blogInfos from '../model/blogModel';
import Response from '../helpers/response';
class commentController{
    static createComment = async(req,res)=>{
        let {content}= req.body;
        let blogIdFromParams= req.params.id;
        const newComment= await commentInfo.create(req.body);
        console.log(newComment)
        const blog= await blogInfos.findByIdAndUpdate(blogIdFromParams,
            {$push:{
                commentId:newComment._id
            }
        });


        if(!blog){
            return Response.errorMessage(res,'failed to create comment',417)
           // return res.status(404).json({
                //status:404,
                //massage:"failed to create comment",
             
       
              // });
        }
        return   Response.successMessage(res,"thank ou for your comment",201)

//return res.status(200).json({
       //  status:200,
       //  massage:"thank ou for your comment",
        // data:blog

      //  });
    }
}
export default commentController;