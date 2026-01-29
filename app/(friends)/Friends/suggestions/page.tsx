"use client";

import React, { use, useContext, useEffect, useState } from "react";
import { UserContext } from "@/public/UserContext";
import { PiEmptyBold } from "react-icons/pi";
import { request } from "https";
import Loading from "../../../../public/Images/loading2.gif";
function page() {

const { user } = useContext(UserContext);
const [users, setUsers] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [sendingId, setSendingId] = useState<string | null>(null);

const addfriend = async (userData: any) => {
  try {
    setSendingId(userData._id);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request?byuserid=${(user as any)._id}&touserid=${userData._id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setUsers((prev) =>
      prev.filter((u) => (u as any)._id !== userData._id)
    );
  } catch (err) {
    console.error(err);
  } finally {
    setSendingId(null);
  }
};


useEffect(() => {
  if (!(user as any)?._id) return;

  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users?userId=${(user as any)._id}`,
        { credentials: "include" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUsers();
}, [user]);



if (isLoading) {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <img
        src={Loading.src}
        alt="Loading"
        className="w-24 opacity-80"
      />
    </div>
  );
}



  return (

    <div>
        {users.length === 0   || users === null ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
                <PiEmptyBold size={80} />
                <p className="mt-4 text-lg">No Suggections.</p>
            </div>
        ) : (
            <div className="p-4 ">
                <ul className="space-y-4">
                    {users.map((user) => (
               <li
  key={(user as any)._id}
  className="flex items-center justify-between py-3 px-5 border rounded-xl bg-[#0D0E0F] border-gray-600"
>
  <div className="flex gap-x-3 items-center">
    <img
      src={(user as any)?.avatar}
      className="w-10 h-10 rounded-full border border-gray-500"
      alt="Profile"
    />
    <p className="font-bold text-gray-200">
      {(user as any).username}
    </p>
  </div>

  <div className="flex gap-3">
    <button onClick={()=>{addfriend(user)}}  className="px-4 py-2 bg-[#89A18E] text-black rounded-xl hover:bg-[#637767]">
      Add Friend
    </button>

  </div>
</li>

                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}

export default page