import mongoose, {Schema , model , models} from "mongoose";

const frequstSchema = new Schema (
{

    status : {type:String  , required : true },
    byuserid :{type: mongoose.Schema.Types.ObjectId , ref: "User" ,required : true } ,
    touserid :{type: mongoose.Schema.Types.ObjectId , ref: "User" ,required : true } ,




},{

    timestamps:true

}

)

const Frequest = models.Comment || model('Frequest' , frequstSchema );

export default Frequest;