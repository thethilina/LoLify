import mongoose, {Schema , model , models} from "mongoose";

const userSchema = new Schema (
{

    username : {type:String  , required : true , unique : true},
    email : {type: String , required : true , unique : true},
    birthdate : {type :Date , required : true},
    password : {type:String , required : true },
    avatar : {type:String  , required : true },
    coverphoto : {type: String , required : true },
    orbs : {type: Number , required: true},
    friends :[{type: mongoose.Schema.Types.ObjectId , ref: "User" } ]






},{

    timestamps:true

}

)

const User = models.User || model('User' , userSchema);

export default User;