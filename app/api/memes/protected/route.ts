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


export const PATCH = async (request : Request ) =>{

try{

const {searchParams} = new URL(request.url);
const userId = searchParams.get('userId');
const memeId = searchParams.get('memeId');

if (!userId || !memeId) {
      return new NextResponse(
        JSON.stringify({ message: "missing userId " }),
        { status: 400 }
      );
    }


if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(memeId)){

    return new NextResponse(JSON.stringify({message : 'Invalide  id' } ) ,{status : 400})
}


await connect();

const user = await User.findById(userId);

if(!user){

 return new NextResponse('User  not found' , {status:400})
}

const meme = await Meme.findById(memeId);

if(!meme){

 return new NextResponse('Meme  not found' , {status:400})
}

const body = await request.json();

if (!body) {
      return new NextResponse(
        JSON.stringify({ message: "Missing Values" }),
        { status: 400 }
      );
    }


const updatedmeme = await Meme.findByIdAndUpdate(
memeId,
{...body},
{new:true}

)


if (!updatedmeme) {
      return new NextResponse(JSON.stringify({ message: "Failed" }), {
        status: 404,
      });
    }


return  new NextResponse(JSON.stringify({message:"Meme updated" , meme : updatedmeme}) , {status : 200});

}catch(e:any){

}







}



export const DELETE = async (request : Request)=>{

try {

const {searchParams} = new URL(request.url);
const memeId = searchParams.get("memeId");

if (!memeId) {
      return new NextResponse(
        JSON.stringify({ message: "missing memeId " }),
        { status: 400 }
      );
    }


if(!Types.ObjectId.isValid(memeId)){

    return new NextResponse(JSON.stringify({message : 'Invalide meme id' } ) ,{status : 400})
}

await connect();

const deletedmeme = await Meme.findByIdAndDelete(memeId);

if (!deletedmeme) {
      return new NextResponse(JSON.stringify({ message: "Meme not found" }), {
        status: 404,
      });
    }


return  new NextResponse(`Meme Deleted successfully` , {status : 200});

} catch(e : any){

 return new NextResponse("error deleting meme" + e.message , {status : 500});   

}

}

