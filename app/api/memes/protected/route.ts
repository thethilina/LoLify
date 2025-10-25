import { NextResponse } from "next/server";   
import mongoose from "mongoose";
import Meme from "@/lib/models/meme";
import User from "@/lib/models/users";
import connect from "@/lib/db";  
import { Types } from "mongoose";





export const GET = async (request : Request) =>{


try{

const {searchParams} = new URL(request.url);
const userId = searchParams.get("user")


if(!userId || userId === "") {
  return new NextResponse("userid missing" , {status:404});
}

if(!mongoose.Types.ObjectId.isValid(userId)){
  return new NextResponse("User Id isnt valid" , {status:404});
}

 const user = await User.findById(userId);

 if(!user){
   return new NextResponse("User not found" , {status:404});
 }



await connect();


const memes = await Meme.find();
return new NextResponse(JSON.stringify(memes) , {status:200})


}catch(e:any){

    return new NextResponse("Error in fetching memes" +e.message , {status:500});

}



}
















export const POST = async (request : Request)=>{

try{

const {searchParams} = new URL(request.url);
const loggeduserid = request.headers.get("loggeduserid")



await connect();



const body = await request.json();
const {userid} = body;

if(!body){
 return new NextResponse('Body not found' , {status:400})
}

if(userid !== loggeduserid){
 return new NextResponse('why the fuck u are trying to access another users ' , {status:404})
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
const memeId = searchParams.get('memeId');
const loggeduserid = request.headers.get("loggeduserid")

if ( !memeId) {
      return new NextResponse(
        JSON.stringify({ message: "missing memeId " }),
        { status: 400 }
      );
    }


if( !Types.ObjectId.isValid(memeId)){

    return new NextResponse(JSON.stringify({message : 'Invalide  memeid' } ) ,{status : 400})
}


await connect();



const meme = await Meme.findById(memeId);

if(!meme){

 return new NextResponse('Meme  not found' , {status:400})
}


if(meme.userid.toString() !== loggeduserid){
 return new NextResponse('why the fuck u are trying to access another users ' , {status:404})
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
const loggeduserid = request.headers.get("loggeduserid")


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

const meme = await Meme.findById(memeId);

if(!meme){
  return new NextResponse(JSON.stringify({ message: "Meme not found" }), {
        status: 404,
      });
}

if(meme.userid.toString() !== loggeduserid){
 return new NextResponse('why the fuck u are trying to access another users ' , {status:404})
}

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

