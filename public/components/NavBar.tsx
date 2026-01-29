"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "@/public/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { GiHamburgerMenu } from "react-icons/gi";

import Logo from "../Images/Logo.png";
import { IoIosSearch } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import SideNavBar from "./SideNavBar";
import { IoCloseSharp } from "react-icons/io5";
import MobileSideNav from "./MobileSideNav";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const loader = useTopLoader();
  const router = useRouter();

  const [isOpened, setOpen] = useState(false);
  const [searchtext, setsearchtext] = useState("");
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    setOpen(false);
  }, [user]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlesearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchtext.trim()) {
      router.push("/");
      return;
    }
    router.push(`/Meme/Search/${searchtext.trim()}`);
  };

  const handleLogout = async () => {
    try {
      loader.start();
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.refresh();
      router.push("/");
      loader.done();
    } catch (e: any) {
      console.log("error logging out " + e.message);
      loader.done();
    }
  };

  return (
   <nav className="flex justify-between px-4 sm:px-10 py-3 items-center 
sticky top-0 z-50 w-full border-b border-gray-500 dark:bg-[#0F0F11] bg-[#ece4e4] ">


      {/* Logo */}
     <div className="flex items-center justify-center gap-x-3">
       {!isSideNavOpen? <GiHamburgerMenu className="z-100 sm:hidden" onClick={ ()=>{setIsSideNavOpen(!isSideNavOpen)}} /> : <IoCloseSharp className="z-100 sm:hidden" onClick={ ()=>{setIsSideNavOpen(!isSideNavOpen)}} />}
        <Link href="/">
        <div className="flex items-center gap-x-4">
          <Image className="hidden sm:block w-8" src={Logo} alt="Logo" />
          <h1 className="text-lg sm:text-xl font-bold text-[#246d3c]">
            LOLify
          </h1>
          
        </div>
      </Link>
</div>
      {/* Search */}
      <form onSubmit={handlesearch} className=" hidden sm:flex items-center mx-3">
        <input
          onChange={(e) => setsearchtext(e.target.value)}
          className="dark:bg-[#2b2b2b]  bg-[#c4bcbc]    w-full sm:w-100 py-1 px-2 sm:py-2 sm:pl-10 rounded-l-full focus:outline-none"
          type="text"
          placeholder="Search Lolify"
        />
        <button className="dark:bg-[#3b3b3b] bg-[#c4bcbc]  py-1.5 sm:py-2.5 px-2 rounded-r-full">
          <IoIosSearch size={20} />
        </button>
      </form>

      {/* Right side */}
      <div className="flex items-center gap-x-3 sm:gap-x-8">
        {user && (
          <>
            <Link href="/post">
              <button className="hidden sm:flex items-center gap-x-2 text-gray-300 px-3 py-1 hover:bg-[#1a1a1d] rounded-xl">
                <IoCreateOutline size={25} />
                <span>Create</span>
              </button>
            </Link>

            <button className="lg:hidden">
              <IoMdNotificationsOutline size={25} />
            </button>
          </>
        )}

        {user ? (
          <div className="relative">
            <Image
              onClick={() => setOpen(!isOpened)}
              src={(user as any).avatar}
              alt="useravatar"
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
            />

            {isOpened && (
              <div
                ref={menuRef}
                className="absolute right-0 top-12 bg-[#28282c] rounded-2xl shadow-lg"
              >
                <ul className="p-3 flex flex-col gap-y-3 min-w-[140px]">
                  <Link href={`/profile/${(user as any)._id}`}>
                    <li className="hover:cursor-pointer">Profile</li>
                  </Link>
                  <li className="hover:cursor-pointer">Settings</li>
                  <li
                    className="hover:cursor-pointer text-red-400"
                    onClick={handleLogout}
                  >
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link href="/Auth/LogIn">
            <button className="border text-sm border-gray-400 bg-[#246d3c] rounded-2xl py-1 px-3 font-semibold">
              Log In
            </button>
          </Link>
        )}
      </div>

      {isSideNavOpen && <div className="fixed inset-0  z-50 "> <MobileSideNav setclose={() => setIsSideNavOpen(false)} /> </div>}

    </nav>
  );
}
