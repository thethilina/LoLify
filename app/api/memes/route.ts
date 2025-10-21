import { NextResponse } from "next/server";   
import mongoose from "mongoose";
import Meme from "@/lib/models/meme";
import User from "@/lib/models/users";
import connect from "@/lib/db";  
import { Types } from "mongoose";


export const POST = async (request : Request)=>{

try{

const {searchParams} = new URL(request.url);
const userId = searchParams.get('userId');

if(!userId){

  return new NextResponse('User id not found' , {status:400})

}

if(!mongoose.Types.ObjectId.isValid(userId)){

   return new NextResponse('User id is not valid' , {status:400})
}


await connect();

const user = await User.findById(userId);

if(!user){

 return new NextResponse('User  not found' , {status:400})
}


const body = await request.json();

if(!body){
 return new NextResponse('Body not found' , {status:400})
}


const newMeme = new Meme(body);

await newMeme.save();

if(!newMeme){
 return new NextResponse('Error posting meme' , {status:400})
}

return new NextResponse(JSON.stringify({message:"Meme posted successfully!" , meme : newMeme  } ) , {status : 200})

}catch(e:any){

 return new NextResponse('Error posting meme' + e.message , {status:500})

}




}

export const GET = async (request : Request) =>{


try{

const {searchParams} = new URL(request.url);
const  page : any = parseInt(searchParams.get('page') || "1");
const  limit : any = parseInt(searchParams.get('limit') || "10");    



await connect();

const  skip = (page - 1) * limit;

const memes = await Meme.find().skip(skip).limit(limit);
return new NextResponse(JSON.stringify(memes) , {status:200})


}catch(e:any){

    return new NextResponse("Error in fetching memes" +e.message , {status:500});

}



}







