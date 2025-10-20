import mongoose, {Schema , model , models} from "mongoose";

const commentSchema = new Schema (
{

    body : {type:String  , required : true },
    userid :{type: mongoose.Schema.Types.ObjectId , ref: "User" ,required : true } ,
    memeid :{type: mongoose.Schema.Types.ObjectId , ref: "Meme" ,required : true } ,



},{

    timestamps:true

}

)

const Comment = models.Comment || model('Comment' , commentSchema);

export default Comment;