import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import { request } from "http";
import mongoose from "mongoose";
import { Types } from "mongoose";

export const GET = async (request : Request , context : {params :any} )=> {


const searchText =  context.params.search;



try{



if (!searchText) {
      return new NextResponse(
        JSON.stringify({ message: "Search text shouldnt be empty " }),
        { status: 400 }
      );
    }

await connect();

const results = await User.find({
username : {$regex: searchText, $options: "i"}
})

if(!results){
   return new NextResponse(
        JSON.stringify({ message: "No users found" }),
        { status: 400 }
      );   
}


return new NextResponse(JSON.stringify(results) , {status:200})

}catch(e:any){

    return new NextResponse("Error in fetching users" +e.message , {status:500});

}



}
