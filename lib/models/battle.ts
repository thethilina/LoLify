import {Schema,models,model, SchemaType} from "mongoose";

const battleSchema = new Schema(
    {
        user_id_by: {type:Schema.Types.ObjectId,ref:"User",required:true},
        user_id_to: {type:Schema.Types.ObjectId,ref:"User",required:true},
        vote_user_1: {type:Schema.Types.ObjectId,ref:"User",required: true},
        vote_for_user_2: {type:Schema.Types.ObjectId,ref:"User",required: true},
        startedTime: {type:Date,default: Date.now},
        status: {type:String,required:true},
        winner: {type:String,required:true},
    },
    {
        timestamps:true
    }
);

const Battle = models.Battle || model("Battle", battleSchema);

export default Battle;
