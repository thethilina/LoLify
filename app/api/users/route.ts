import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import { request } from "http";
import mongoose from "mongoose";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async (request : Request)=> {


try{

const {searchParams} = new URL(request.url);
const  page : any = parseInt(searchParams.get('page') || "1");
const  limit : any = parseInt(searchParams.get('limit') || "10");    



await connect();

const  skip = (page - 1) * limit;

const users = await User.find().skip(skip).limit(limit);
return new NextResponse(JSON.stringify(users) , {status:200})


}catch(e:any){

    return new NextResponse("Error in fetching users" +e.message , {status:500});

}



}


export const POST = async( request : Request)=>{


try{


const body = await request.json();
await connect();
const newuser = new User(body);
await newuser.save();
return new NextResponse(JSON.stringify({message:"User Created  succesfully !" , user : newuser}) , {status : 200})



}catch(e:any){

return new NextResponse("error creating user" + e.message , {status : 500});



}


}


export const PATCH = async( request : Request)=>{


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
const {fieldToEdit , newValue} = body;

if (!newValue) {
      return new NextResponse(
        JSON.stringify({ message: "Missing Values" }),
        { status: 400 }
      );
    }

if (!fieldToEdit) {
      return new NextResponse(
        JSON.stringify({ message: "Missing field to edit" }),
        { status: 400 }
      );
    }


await connect();

const updatedUser = await User.findByIdAndUpdate(

userId,
{[fieldToEdit] : newValue},    
{new:true}, 


)

if (!updatedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }


return  new NextResponse(`${fieldToEdit} updated succesfully` , {status : 200});


}catch(e:any){

return new NextResponse("error updating user" + e.message , {status : 500});



}


}

export const DELETE = async (request : Request)=>{

try {

const {searchParams} = new URL(request.url);
const userId = searchParams.get("userId");

if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "missing userId " }),
        { status: 400 }
      );
    }


if(!Types.ObjectId.isValid(userId)){

    return new NextResponse(JSON.stringify({message : 'Invalide user id' } ) ,{status : 400})
}

await connect();

const deletedUser = await User.findByIdAndDelete(userId);

if (!deletedUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }


return  new NextResponse(`User updated succesfully` , {status : 200});

} catch(e : any){

 return new NextResponse("error deleting user" + e.message , {status : 500});   

}

}

