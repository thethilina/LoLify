import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import Meme from "@/lib/models/meme";
import { request } from "http";
import mongoose from "mongoose";
import { Types } from "mongoose";


export const GET = async (request : Request)=>{

try{

const {searchParams} = new URL(request.url);
const  page : any = parseInt(searchParams.get('page') || "1");
const  limit : any = parseInt(searchParams.get('limit') || "10");    


const  skip = (page - 1) * limit;

await connect();


const memes = await Meme.find().skip(skip).limit(limit);
return new NextResponse(JSON.stringify(memes) , {status:200})



}catch(e:any){

 return new NextResponse("Error in fetching memes" +e.message , {status:500});

}


}


export const POST = async (request : Request) =>{

try{

const {searchParams} = new URL(request.url);
const userId = searchParams.get('userId');

if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "missing userId " }),
        { status: 400 }
      );
    }


if(!Types.ObjectId.isValid(userId)){

    return new NextResponse(JSON.stringify({message : 'Invalide user id' } ) ,{status : 400})
}

const body = await request.json();


if (!body) {
      return new NextResponse(
        JSON.stringify({ message: "Missing Values" }),
        { status: 400 }
      );
    }


    await connect();

    const newmeme = new Meme(body);
    await newmeme.save();

return new NextResponse(JSON.stringify({message:"Meme posted  succesfully !" , user : newmeme}) , {status : 200})

}catch(e:any){

return new NextResponse("Error in posting meme" +e.message , {status:500});    
}



}

export const PATCH = async (request : Request) =>{

try{
const {searchParams} = new URL(request.url);
const memeId = searchParams.get('memeId');

if (!memeId) {
      return new NextResponse(
        JSON.stringify({ message: "missing userId " }),
        { status: 400 }
      );
    }


if(!Types.ObjectId.isValid(memeId)){

    return new NextResponse(JSON.stringify({message : 'Invalide user id' } ) ,{status : 400})
}

const body = await request.json();


await connect();

const updatedmeme = await Meme.findByIdAndUpdate(
memeId,
{...body},
{new:true}, 
)

if (!updatedmeme) {
      return new NextResponse(JSON.stringify({ message: "Meme not found" }), {
        status: 404,
      });
    }


return  new NextResponse(`Meme updated succesfully` , {status : 200});


}catch(e:any){

    return new NextResponse("Error in updating meme title" +e.message , {status:500});    
}



}