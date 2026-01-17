import { IoHomeOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiCrown } from "react-icons/pi";
import { LuUserRound } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";

export default function SideNavBar() {


    return (
        <div className="z-49 sm:flex hidden  h-screen border-r   border-gray-500 fixed top-17 left-0 ">
            <nav className="    pt-5 px-10 bg-[#131316] gap-y-5 text-[#A7A7D4] items-start  ">
                <div className="flex flex-col gap-y-4  border-gray-500 ">
                    <button className="flex items-center gap-x-4 px-6 rounded-2xl py-2 bg-[#0d0d0f] hover:bg-[#27272e] hover:cursor-pointer "><IoHomeOutline size={25} /> Home</button>
                    <button className="flex items-center gap-x-4 px-6 rounded-2xl py-2 bg-[#0d0d0f] hover:bg-[#27272e] hover:cursor-pointer "><LiaUserFriendsSolid size={25} /> Friends</button>
                    <button className="flex items-center gap-x-4 px-6 rounded-2xl py-2 bg-[#0d0d0f] hover:bg-[#27272e] hover:cursor-pointer"><PiCrown size={25} /> <Link href="/Leaderboard">Leader Board</Link></button>
                    <button className="flex items-center gap-x-4 px-6 rounded-2xl py-2 bg-[#0d0d0f] hover:bg-[#27272e] hover:cursor-pointer"><LuUserRound size={25} />Profile</button>
                    <button className="flex items-center gap-x-4 px-6 rounded-2xl py-2 bg-[#0d0d0f] hover:bg-[#27272e] hover:cursor-pointer"><CiSettings size={25} />Settings</button>
                </div>
            </nav>
        </div>



    )






}