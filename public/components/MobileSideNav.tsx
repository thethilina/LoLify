import { IoHomeOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiCrown } from "react-icons/pi";
import { LuUserRound } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

import Link from "next/link";

function MobileSideNav({setclose}: any) {
  return (
    <aside className="fixed flex flex-col pt-15  items-center  inset-0 z-50 bg-[#131316] h-screen w-4/5">
      <nav className="pt-5 px-6 flex flex-col gap-y-4 text-[#A7A7D4]">

          <Link
          href="/post"
          className="flex items-center gap-x-4 px-6 py-2 rounded-2xl bg-[#0d0d0f] hover:bg-[#27272e]"
            onClick={setclose}
        >
            <IoCreateOutline size={25} /> Create
        </Link>
        <Link
          href="/"
          className="flex items-center gap-x-4 px-6 py-2 rounded-2xl bg-[#0d0d0f] hover:bg-[#27272e]"
            onClick={setclose}
        >
              <IoHomeOutline size={25} /> Home
        </Link>

        <Link
          href="/Friends"
          className="flex items-center gap-x-4 px-6 py-2 rounded-2xl bg-[#0d0d0f] hover:bg-[#27272e]"
          onClick={setclose}
        >
          <LiaUserFriendsSolid size={25} /> Friends
        </Link>

        <Link
          href="/Leaderboard"
          className="flex items-center gap-x-4 px-6 py-2 rounded-2xl bg-[#0d0d0f] hover:bg-[#27272e]"
          onClick={setclose}
        >
          <PiCrown size={25} /> Leaderboard
        </Link>

        <Link
          href="/profile"
          className="flex items-center gap-x-4 px-6 py-2 rounded-2xl bg-[#0d0d0f] hover:bg-[#27272e]"
          onClick={setclose}
        >
          <LuUserRound size={25} /> Profile
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-x-4 px-6 py-2 rounded-2xl bg-[#0d0d0f] hover:bg-[#27272e]"
          onClick={setclose}
        >
          <CiSettings size={25} /> Settings
        </Link>
      </nav>
    </aside>
  );
}

export default MobileSideNav;
