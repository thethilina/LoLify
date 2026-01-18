"use client"

import { UserContext } from "@/public/UserContext";
import { useContext } from "react";
import Logo from "../Images/Logo.png"
import Image from "next/image"
import { IoIosSearch } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTopLoader } from 'nextjs-toploader';




export default function NavBar() {

  {/* popup login */ }
    const { user, setUser } = useContext(UserContext);

  const loader = useTopLoader();
  const [isOpened, setOpen] = useState(false);
  const [searchtext, setsearchtext] = useState("")
  

  const router = useRouter();


  useEffect(() => {
    setOpen(false);
  }, [user]);


  const handlesearch = (e:any)=>{

   e.preventDefault(); 
  if(searchtext === ""){ 
    router.push("/")
    return
  }

  router.push(`/Meme/Search/${searchtext}`)




  }





  const handleLogout = async () => {

    try {
      loader.start()
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.push("/")
      loader.done()


    } catch (e: any) {

      console.log("error logging out" + e.message)
      loader.done()
    }





  }




  return (




    <nav className="   flex  justify-between  px-4 sm:px-10 py-3 items-center top-0 z-50 fixed  w-full border-b border-gray-500 bg-[#0F0F11]    ">



      
      <Link href="/">
        {/* Logo */}
        <div className="flex items-center gap-x-4">
          <Image className=" sm:block hidden w-8" src={Logo} alt="Logo" />
          <h1 className="text-lg sm:xl font-bold text-[#246d3c]  ">LOLify</h1>
        </div>
      </Link>

      {/* Search Bar */}




      <form onSubmit={(e)=>{handlesearch(e)}} className="flex items-center mx-3 ">
        <input onChange={(e)=>{setsearchtext(e.target.value.trim())}} className="bg-[#2b2b2b] sm:w-100 w-full py-1  px-2   sm:py-2 sm:pl-10 sm:px-2  rounded-l-full  focus:border-[#878b87] focus:outline-none" type="text" placeholder="Search Lolify" />
        <button className="bg-[#3b3b3b] py-1.5   sm:py-2.5 px-2 rounded-r-full hover:cursor-pointer"><  IoIosSearch size={20} /></button>
      </form>

    
     

      

      {/* right side buttons */}
      <div className="flex items-center gap-x-3   sm:gap-x-8">

     
        {user && <>
          <Link href="/post"><button className=" items-center justify-center gap-x-2  text-gray-300 sm:py-1 sm:px-3  hover:bg-[#1a1a1d] hidden sm:flex rounded-xl hover:cursor-pointer">< IoCreateOutline size={25} /> <h1 className="sm:block hidden">Create</h1></button></Link>

          <button className="lg:hidden"><IoMdNotificationsOutline size={25} /></button></>
        }

        {user ?
          <div>
            <Image onClick={() => { isOpened ? setOpen(false) : setOpen(true) }} src={(user as any).avatar} alt="useravatar" width={30} height={30} className=" rounded-full border  min-size-5  object-cover  border-gray-600 hover:cursor-pointer" />
            {isOpened && <div ref={e => e?.focus()} onBlur={() => setOpen(false)} tabIndex={0} className="  absolute right-5 top-14 bg-[#28282c]  rounded-2xl">
              <ul className="p-3 flex flex-col gap-y-3">
                <li className="hover:cursor-pointer "  >Profile</li>
                <li className="hover:cursor-pointer " >Settings</li>
                <li className="hover:cursor-pointer " onClick={handleLogout}>Log out</li>

              </ul>

            </div>}

          </div>

          :

          <Link href="/Auth/LogIn">  <button onClick={() => { setOpen(true) }}
            className=" border text-sm border-gray-400 text-[#ffffff] bg-[#246d3c] rounded-2xl py-1 px-3 font-semibold hover:cursor-pointer" >Log In   </button></Link>
        }
      </div>



    </nav>
    
 





  )


}