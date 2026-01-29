"use client";

import React, { use, useContext, useEffect, useState } from "react";
import { UserContext } from "@/public/UserContext";
import { PiEmptyBold } from "react-icons/pi";
import Loading from "../../../../public/Images/loading2.gif";
function page() {

const { user } = useContext(UserContext);
const [pendingRequests, setPendingRequests] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const acceptrequest = async (friendStatus:any) => {


  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request?requestId=${friendStatus._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("Accept request response:", data);
    setPendingRequests(pendingRequests.filter((u) => (u as any)._id !== data._id));



    if (!res.ok) throw new Error(data.message);

  


  } catch (err) {
    console.error("Error accepting request:", err);
  }
};

useEffect(() => {
  if (!(user as any)?._id) return;

  const fetchPendingRequests = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request?userId=${(user as any)._id}`,
        { credentials: "include" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setPendingRequests(
        Array.isArray(data.friendrequests) ? data.friendrequests : []
      );
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      setPendingRequests([]);
    } finally {
      setIsLoading(false); // ← ALWAYS stop loading
    }
  };

  fetchPendingRequests();
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
        {pendingRequests.length === 0   || pendingRequests === null ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
                <PiEmptyBold size={80} />
                <p className="mt-4 text-lg">No pending friend requests</p>
            </div>
        ) : (
            <div className="p-4">
                <ul className="space-y-4">
                    {pendingRequests.map((request) => (
               <li
  key={(request as any)._id}
  className="flex items-center justify-between py-3 px-5 border rounded-xl bg-[#0D0E0F] border-gray-600"
>
  <div className="flex gap-x-3 items-center">
    <img
      src={(request as any).byuserid?.avatar}
      className="w-10 h-10 rounded-full border border-gray-500"
      alt="Profile"
    />
    <p className="font-bold text-gray-200">
      {(request as any).byuserid?.username}
    </p>
  </div>

  <div className="flex gap-3">
    <button onClick={() => acceptrequest(request)} className="px-4 py-2 bg-[#89A18E] text-black rounded-xl hover:bg-[#637767]">
      Accept
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