import { NextResponse } from "next/server";   
import mongoose from "mongoose";
import User from "@/lib/models/users";
import Frequest from "@/lib/models/FriendRequest";
import connect from "@/lib/db";  
import { Types } from "mongoose";

export const PATCH = async (request : Request) => {

try{
    const {searchParams} = new URL(request.url);
const userId =  searchParams.get("userId");
const usertoremoveId = searchParams.get("usertoremoveId");

if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "missing userId " }),
        { status: 400 }
      );
    }


if(!Types.ObjectId.isValid(userId)){

    return new NextResponse(JSON.stringify({message : 'Invalide byuser id' } ) ,{status : 400})
}

if (!usertoremoveId) {
      return new NextResponse(
        JSON.stringify({ message: "missing userId " }),
        { status: 400 }
      );
    }


if(!Types.ObjectId.isValid(usertoremoveId)){

    return new NextResponse(JSON.stringify({message : 'Invalide user id' } ) ,{status : 400})
}


await connect();

const user = await User.findById(userId);

if(!user){
    return new NextResponse(JSON.stringify({message:"user not found"}) , {status:404})
}

const usertoremove = await User.findById(usertoremoveId);

if(!usertoremove){
    return new NextResponse(JSON.stringify({message:"usertoremove not found"}) , {status:404})
}


const updateduser = await User.findByIdAndUpdate(
userId,
{$pull: {friends: usertoremoveId}},
{new:true}

)

if(!updateduser){
    return new NextResponse(JSON.stringify({message:"Error removing friend"} ) , {status:400})
}

const updated2nduser = await User.findByIdAndUpdate(
usertoremoveId,
{$pull: {friends: userId}},
{new:true}

)


if(!updated2nduser){
    return new NextResponse(JSON.stringify({message:"Error removing friend"} ) , {status:400})
}


return new NextResponse(JSON.stringify({user:updateduser}),{status:200})}
catch(e:any){
  return new NextResponse(
      JSON.stringify({ message: "error removing friend " + e.message }),
      { status: 500 }
    );
}

}