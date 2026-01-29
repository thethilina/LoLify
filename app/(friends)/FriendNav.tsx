'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"

function FriendNav() {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;
    const activeClass = "bg-gray-200 dark:bg-[#1a1a1d]";
    const inactiveClass = "hover:bg-gray-200 dark:hover:bg-[#1a1a1d]";

    return (
        <div className="flex items-center justify-start border-b border-gray-700 sticky top-14 sm:top-16.5 bg-[#0F0F11] z-10">
            <Link href="/Friends"><button className={`sm:text-lg border-r border-gray-700 px-3 py-3 transition-colors ${isActive('/Friends') ? activeClass : inactiveClass}`}>Friends</button></Link>
            <Link href="/Friends/pendingreq"><button className={`sm:text-lg border-r border-gray-700 px-3 py-3 transition-colors ${isActive('/Friends/pendingreq') ? activeClass : inactiveClass}`}>Pending Requests</button></Link>
            <Link href="/Friends/suggestions"><button className={`sm:text-lg border-r border-gray-700 px-3 py-3 transition-colors ${isActive('/Friends/suggestions') ? activeClass : inactiveClass}`}>Suggestions</button></Link>
        </div>
    )
}

export default FriendNav
