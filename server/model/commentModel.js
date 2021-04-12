import mongoose  from "mongoose";

const commentSchema= new mongoose.Schema({
    content:{
        type :String,
        required:[true,"please provide content of comment"]
    },
    timeStamp:{
        type: Date,
        default: new Date(Date.now())

    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required :[true,"please valid userId"]
    }
});
 commentSchema.pre(/^find/, function(next){
    this.populate({
        path:"userId",
        select:"firstName"
    })
    next();
    
});
const commentInfo=mongoose.model('comment', commentSchema);
export default commentInfo;
