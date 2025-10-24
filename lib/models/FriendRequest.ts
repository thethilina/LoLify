import mongoose, {Schema , model , models} from "mongoose";

const frequstSchema = new Schema (
{

    
    byuserid :{type: mongoose.Schema.Types.ObjectId , ref: "User" ,required : true } ,
    touserid :{type: mongoose.Schema.Types.ObjectId , ref: "User" ,required : true } ,




},{

    timestamps:true

}

)

const Frequest = models.Comment || model('Frequest' , frequstSchema );

export default Frequest;