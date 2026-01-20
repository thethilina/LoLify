"use client";

import { useState } from "react";
import Link from "next/link"
import { useTopLoader } from 'nextjs-toploader';
import { useRouter } from "next/navigation";
import { UserContext } from "@/public/UserContext";
import { useContext } from "react";


export default function Page() {


  const { user, setUser } = useContext(UserContext);

  const loader = useTopLoader();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState<string>("");


  const setmessage = (msg: string) => {

    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000);


  }

  const handlelogging = async () => {


    try {

      loader.start()

      if (!username || !password || username === "" || password === "") {

        setmessage("Please enter both your username and password");
        loader.done()
        return

      }



      const body = {

        username,
        password

      }

      const UserResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include",
      });


      if (!UserResponse.ok) {
        setmessage("Incorrect username or password");
        loader.done()
        return
      }
      const data = await UserResponse.json();

      setUser(data.user);
      router.refresh();
      router.push("/")

      loader.done()

    } catch (e: any) {
      setmessage("Error logging")
      loader.done()
      return





    }




  }








  return (
    <div className="  items-center w-full  h-full flex-col justify-center flex   gap-y-10  text-lg text-[#B9B9CE]     ">

      <h1 className="text-2xl font-semibold    text-[#8f96be] ">Welcome Back!</h1>

      <form className="flex flex-col justify-around  gap-y-10" >





        {/*items*/}

        <div className="flex gap-x-4 justify-between">
          <h1 className="flex flex-col gap-y-2      items-start      gap-x-5 justify-between">User Name :
            <input value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="User Name" className="rounded-xl w-80  py-1 px-4  bg-[#333333] focus:border-[#878b87] focus:outline-none " /></h1>

        </div>




        <div className="flex gap-x-4 justify-between">



          <h1 className="flex  flex-col  gap-y-2    items-start     gap-x-5 justify-between">Password :
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" className="rounded-xl w-80 py-1 px-4 bg-[#333333] focus:border-[#878b87] focus:outline-none" /></h1>

        </div>







      </form>

      <div className="flex gap-x-10 mt-5 justify-between items-center gap-y-10">
        <h1><Link href="/Auth/SignIn"> Don't have an account? SignUp </Link></h1>
        <button type="button" onClick={handlelogging} className="font-medium bg-[#4b4679]   px-7 hover:cursor-pointer hover:bg-[#6d62cf] py-1 rounded-xl ">Log In</button>
      </div>

      {message && <div className="text-red-500 font-medium">{message}</div>}

    </div>


  )




}