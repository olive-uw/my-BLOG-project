import blogData from "../model/blogModel";
import Response from  '../helpers/response';


class BlogController {

  static getAllBlogFromApi=async(req,res)=>{
    try{
        const responseFromApi= await axios.get("https://blogpost-api-shecancode.herokuapp.com/api/v1/blog/dash/all")
        return Response.successMessage(res,"fetched successfully",responseFromApi.data,200)
    } catch(e){
        console.log(e)
         return Response.errorMessage(res,"failed to fetch",403)
    }
}             

    static updateOneBlog= async(req,res)=>{
        const blogId= req.params.id;
        let {
            title,
            content,
            
        } = req.body;

        const blog =await blogData.findById(blogId)
        if(!blog){
            return   Response.errorMessage(res,'blog not found',409)
          //  return res.status(404).json({
             //   status:404,
             //   message:"blog not found"
          //  })
        }

       await blogData.findByIdAndUpdate(blogId,req.body);

        const data = await blogData.findById(blogId);

        return   Response.successMessage(res,"blog updated succesfully",blogData,201)

       // return res.status(200).json({
         //   status:200,
          //  message:"blog updated succesfully",
          //  data
      //  })



    }
    // dealeting one blog

    static deleteOneBlog=async(req,res)=>{
        const blogId= req.params.id;

        await blogData.findByIdAndDelete(blogId)
        const data = await blogData.findById(blogId)
       
        if (!data) {
            return   Response.errorMessage(res,'blog  does not exist ',409)
          //  return res.status(200).json({
            //    status: 200,
              //  message: "blog  does not exist",
           // })
        }
        return   Response.successMessage(res,"blog is successfull deleted",201)

      //  return res.status(201).json({
         //   status: 201,
          //  message: "blog  failed to delete",
        //    data
      //  })
    }

   // getting all blogs

    static getAllBlogs = async(req, res) => {
        const data = await blogData.find();
        console.log(data)
       
        return   Response.successMessage(res,"this is all blogs",data,201)
       // return res.status(200).json({
         //   status: 200,
           // message: "this is all blogs",
           // data
      //  });
    }


   // getting one blog

    static getOneBlog = async(req, res) => {
    const blogId = req.params.id;
    const data = await blogData.findById(blogId)
     if (!data) {
        return   Response.errorMessage(res,'blog  failed to be registered ',409)

           // return res.status(417).json({
            //    status: 417,
             //   message: "blog  failed to be registered",
           // })
        }
        return   Response.successMessage(res,"blog  created succesfully",data,201)
       
       // return res.status(201).json({
         //   status: 201,
            ////message: "blog  created succesfully",
          //  data
      //  })
    }

    static createBlog =async (req, res) => {
  
        const timeStamp = new Date(Date.now());
        let {
            title,
            content,
            
        } = req.body;

      req.body.timeStamp=timeStamp;


        const data =await  blogData.create(req.body)

        if (!data) {
            return   Response.errorMessage(res,'blog  failed to be created ',409)

           // return res.status(417).json({
              //  status: 417,
              //  message: "blog  failed to be registered",
           // })
        }
        console.log("create: ",data)
        return   Response.successMessage(res,"blog  created succesfully",blogData,201)

        //return res.status(201).json({
         //   status: 201,
         //   message: "blog  created succesfully",
           // data:data._doc
       // })


    }
}

export default BlogController;
