import { NextResponse } from "next/server";   
import mongoose from "mongoose";
import Meme from "@/lib/models/meme";
import User from "@/lib/models/users";
import Comment from "@/lib/models/comment";
import connect from "@/lib/db";  
import { Types } from "mongoose";

export const GET = async (request : Request) => {

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
    {memeId}
)

if(comments.length === 0) {

      return new NextResponse(
            JSON.stringify({ message: "No comments Yet" }),
            { status: 202 }
          );
}


 return new NextResponse(JSON.stringify(comments), { status: 200 });

}


export const POST = async (request : Request) => {


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

const newcomment = new Comment(body);

}