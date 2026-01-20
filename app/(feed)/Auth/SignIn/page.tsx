"use client";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import Signup from "../../../public/Images/signup.png"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTopLoader } from 'nextjs-toploader';


export default function SignIn() {

  const loader = useTopLoader();
  const [message, setMessage] = useState<string>("");
  const [profilepic, setProfilepic] = useState<File | null>(null);
  const [coverphoto, setCoverphoto] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilepic(e.target.files[0]);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverphoto(e.target.files[0]);
    }
  };


  const handleSubmit = async () => {
    try {
      loader.start()

      const maxSize = 5 * 1024 * 1024;

      if (!profilepic || !coverphoto || !username || !email || !age || !password) {
        setmessage("Please fill in all fields");
        loader.done()
        return;
      }



      if (profilepic.size > maxSize) {

        setmessage("Profile picture can't be larger than 5MB");
        loader.done()
        return
      }


      if (coverphoto.size > maxSize) {

        setmessage("Cover picture can't be larger than 5MB");
        loader.done()
        return


      }


      const emialres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkemail?email=${email}`)

      if (!emialres.ok) {

        setmessage("Email is already used")
        loader.done()
        return

      }

      const userres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkusername?username=${username}`)

      if (!userres.ok) {

        setmessage("User name is already taken")
        loader.done()
        return

      }



      const pp = new FormData();
      pp.append("file", profilepic);
      const profilepicResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`, {
        method: "POST",
        body: pp
      });

      const profilepicUrl = await profilepicResponse.json();


      if (!profilepicUrl.secure_url) {
        setmessage("Error uploading profile picture")
        loader.done()
        return
      }



      const cp = new FormData();
      cp.append("file", coverphoto);
      const coverphotoResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`, {
        method: "POST",
        body: cp
      });
      const coverphotoUrl = await coverphotoResponse.json();

      if (!coverphotoUrl.secure_url) {
        setmessage("Error uploading cover picture")
        loader.done()
        return
      }

      const body = {
        avatar: profilepicUrl.secure_url,
        coverphoto: coverphotoUrl.secure_url,
        username,
        email,
        birthdate: age.toString(),
        password,
        orbs: 0
      };


      const newuserResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const newuserData = await newuserResponse.json();
      console.log(newuserData);

      router.push("/Auth/LogIn");
      loader.done()

    } catch (e: any) {
      setmessage("Error during registration")
      console.error("Error during registration:", e.message);
      loader.done()
    }
  };




  const setmessage = (msg: string) => {

    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);


  }




  return (


    <div className=" items-center w-full h-full flex-col justify-center flex   gap-y-10  text-lg text-[#B9B9CE]     ">

      <h1 className="text-2xl font-semibold text-[#8f96be] ">Welcome to LOLify!</h1>

      <form className="flex flex-col justify-around  gap-y-10" >




        <div className="flex items-center gap-x-5"><div style={{
          backgroundImage: profilepic ? `url(${URL.createObjectURL(profilepic)})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} className="w-16 border-3 border-gray-600 h-16 bg-gray-500 rounded-full   flex justify-end items-end ">
          <input onChange={handleProfileChange} type="file" accept=".jpg,.jpeg,.png" className="absolute  opacity-0 h-10 w-10 hover:cursor-pointer " />
          <FaCamera className="bg-gray-800 p-2 h-8 w-8 hover:bg-gray-900 hover:cursor-pointer border-gray-400 rounded-full hover:border hover:border-gray-600" />
        </div>
          <h1>Set Your Avatar</h1>
        </div>



        {/* profile pic and cover photo */}
        <div className="flex flex-col gap-y-2">

          <h1>Set Your Cover Photo</h1>
          <div className="flex justify-center items-center ">
            <div className="h-50 w-150  bg-gray-600 flex  justify-between  border-2 border-gray-400 rounded-lg " style={{
              backgroundImage: coverphoto ? `url(${URL.createObjectURL(coverphoto)})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>

              <div className="bg-gray-800 p-3 h-10 w-10 m-2 border-gray-400  flex items-center hover:cursor-pointer hover:border hover:border-gray-400 hover:bg-gray-900   rounded-full">
                < FaCamera />
                <input onChange={handleCoverChange} type="file" accept=".jpg,.jpeg,.png" className="absolute  opacity-0 h-10 w-10 hover:cursor-pointer " />
              </div>
            </div>
          </div>

        </div>


        {/*items*/}

        <div className="flex gap-x-4 justify-between">
          <h1 className="flex flex-col gap-y-2      items-start      gap-x-5 justify-between">User Name :
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="User Name" className="rounded-xl w-80  py-1 px-4  bg-[#333333] focus:border-[#878b87] focus:outline-none " /></h1>
          <h1 className="flex flex-col  gap-y-2      items-start      gap-x-5 justify-between">Emaill :
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" className="rounded-xl py-1  w-80 px-4 bg-[#333333]  focus:border-[#878b87] focus:outline-none" /></h1>
        </div>




        <div className="flex gap-x-4 justify-between">


          <h1 className="flex  flex-col  gap-y-2    items-start     gap-x-5 justify-between">Enter Your Age :
            <input value={age} onChange={(e) => { setAge(parseInt(e.target.value)) }} type="number" placeholder="Age" className="rounded-xl py-1 w-80 px-4 bg-[#333333] focus:border-[#878b87] focus:outline-none" /></h1>
          <h1 className="flex  flex-col  gap-y-2    items-start     gap-x-5 justify-between">Create Your Password :
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" className="rounded-xl w-80 py-1 px-4 bg-[#333333] focus:border-[#878b87] focus:outline-none" /></h1>

        </div>


        <div className="flex justify-between items-center mt-5">
          <h1><Link href="/Auth/LogIn"> Already a member? LogIn </Link></h1>
          <button type="button" onClick={handleSubmit} className="font-medium bg-[#4b4679]   px-7 hover:cursor-pointer hover:bg-[#6d62cf] py-1 rounded-xl ">Sign Up</button>
        </div>



      </form>
      {message && <div className="text-red-500 font-medium">{message}</div>}
    </div>


  )




}