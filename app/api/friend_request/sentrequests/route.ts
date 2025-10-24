import { NextResponse } from "next/server";   
import mongoose from "mongoose";
import User from "@/lib/models/users";
import Frequest from "@/lib/models/FriendRequest";
import connect from "@/lib/db";  
import { Types } from "mongoose";

export const GET = async (request : Request) => {


try{


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

const friendrequests = await Frequest.find(
    {byuserid : userId}
)

if(!friendrequests || friendrequests.length === 0) {
    return new NextResponse(JSON.stringify({message:"No requests to show"}) ,{status:202})
}

return new NextResponse(JSON.stringify({friendrequests : friendrequests}) ,{status:202})

}catch(e:any){

return new NextResponse(JSON.stringify({mesage:"Error fetching requests" + e.message} ) ,{status:500})

}


}