import { NextResponse } from "next/server";   
import mongoose from "mongoose";
import Meme from "@/lib/models/meme";
import User from "@/lib/models/users";
import Comment from "@/lib/models/comment";
import connect from "@/lib/db";  
import { Types } from "mongoose";

export const GET = async (request : Request) => {

 try{

const {searchParams} =  new URL(request.url);
const memeId = searchParams.get("memeId");

if(!memeId){

  return new NextResponse('Meme id not found' , {status:400})

}

if(!mongoose.Types.ObjectId.isValid(memeId)){

   return new NextResponse('Meme id is not valid' , {status:400})
}


await connect();

const meme = await Meme.findById(memeId);

if(!meme){

 return new NextResponse('Meme  not found' , {status:400})
}

const comments = await Comment.find(
    {memeid :memeId}
)

if(comments.length === 0) {

      return new NextResponse(
            JSON.stringify({ message: "No comments Yet" }),
            { status: 202 }
          );
}


 return new NextResponse(JSON.stringify(comments), { status: 200 });

}
catch(e:any){

 return new NextResponse('Error getting meme' + e.message , {status:500})

}


}
