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


export const POST = async (request : Request) => {

try{

const {searchParams} =  new URL(request.url);
const memeId = searchParams.get("memeId");
const userId = searchParams.get("userId");

if(!memeId || !userId){

  return new NextResponse('Meme id not found' , {status:400})

}

if(!mongoose.Types.ObjectId.isValid(memeId) || !mongoose.Types.ObjectId.isValid(userId)){

   return new NextResponse('Meme id or User id is not valid' , {status:400})
}


await connect();

const meme = await Meme.findById(memeId);
const user = await User.findById(userId);

if(!meme ){

 return new NextResponse('Meme  not found' , {status:400})
}

if(!user ){

 return new NextResponse('User  not found' , {status:400})
}


const body = await request.json();

if(!body ){

 return new NextResponse('Body  not found' , {status:404})
}


const newcomment = new Comment(body);

await newcomment.save();

if(!newcomment){
    return new NextResponse("Error posting comment" , {status:400})
}


return new NextResponse(JSON.stringify({newcomment}) , {status:200})

}catch(e:any){

 return new NextResponse('Error posting comment'+ e.message , {status:500})

}

}



export const PATCH = async (request : Request) => {

try{

const {searchParams} = new URL(request.url);
const commentId = searchParams.get("commentId");
const userId = searchParams.get("userId");

if(!commentId || !userId){

  return new NextResponse('comment id or user id not found' , {status:404})

}

if(!mongoose.Types.ObjectId.isValid(commentId) || !mongoose.Types.ObjectId.isValid(userId)){

   return new NextResponse('comment id or User id is not valid' , {status:404})
}


await connect();

const comment = await Comment.findById(commentId);
const user = await User.findById(userId);

if(!comment){

 return new NextResponse('Meme  not found' , {status:400})
}

if(!user ){

 return new NextResponse('User  not found' , {status:400})
}


const body = await request.json();

if(!body){

    return new NextResponse(JSON.stringify({message:"body not found"}) , {status:404})
}

const updatedcomment = await Comment.findByIdAndUpdate(
    commentId,
    {...body},
    {new:true}
)

if(!updatedcomment){
    return new NextResponse(JSON.stringify({message:"Error udating comment"}) , {status:400})
}

return new NextResponse( JSON.stringify({comment:updatedcomment}) , {status:200})

}catch(e:any){

 return new NextResponse('Error updating comment' + e.message, {status:500})


}

}

export const DELETE = async (request :  Request) =>{

try{

 
const {searchParams} = new URL(request.url);
const commentId = searchParams.get("commentId");


if(!commentId ){

  return new NextResponse('comment id or user id not found' , {status:404})

}

if(!mongoose.Types.ObjectId.isValid(commentId) ){

   return new NextResponse('comment id or User id is not valid' , {status:404})
}


await connect();

const comment = await Comment.findById(commentId);


if(!comment){

 return new NextResponse('Comment  not found' , {status:400})
}
   

const deletedcomment = await Comment.findByIdAndDelete(commentId);

if(!deletedcomment){
    return new NextResponse(JSON.stringify({message:"Error deleting comment"}) , {status:400})
}

return new NextResponse(JSON.stringify({message:"Comment deleted successfully!"}) , {status:200})

}catch(e:any){

  return new NextResponse('Error deleting comment' + e.message, {status:500})   
}

}