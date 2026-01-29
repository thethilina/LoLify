"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/public/UserContext";
import { PiEmptyBold } from "react-icons/pi";
import Loading from "../../../public/Images/loading2.gif";



function Page() {
  const { user } = useContext(UserContext);

  const [friends, setFriends] = useState<any[]>([]);
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!(user as any)?._id) return;

    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${(user as any)._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setFriendIds(data.friends || []);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    if (friendIds.length === 0) {
      setFriends([]);
      return;
    }

    const fetchFriends = async () => {
      try {
        const results = await Promise.all(
          friendIds.map(async (friendId) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${friendId}`,
              {
                method: "GET",
                credentials: "include",
              }
            );
            return res.json();
          })
        );

        setFriends(results);
      } catch (err) {
        console.error("Error fetching friends:", err);
      }
    };

    fetchFriends();
  }, [friendIds]);

  const unfriend = async (friend: any) => {
    if (!(user as any)?._id) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request/removefriends?userId=${(user as any)._id}&usertoremoveId=${friend._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFriends((prev) =>
        prev.filter((f) => f._id !== friend._id)
      );

      setFriendIds((prev) =>
        prev.filter((id) => id !== friend._id)
      );
    } catch (err) {
      console.error("Error unfriending:", err);
      alert("Failed to remove friend");
    } 

    
  };
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
    <>
      {friends.length === 0 && !isLoading  ? (
         <div className="flex flex-col items-center justify-center h-[70vh] text-gray-400">
                     <PiEmptyBold size={80} />
                     <p className="mt-4 text-lg">Ypu have no friends added yet.</p>
                 </div>
      ) : (





      
    <div className="p-3 space-y-4">
      {friends.map((friend) => (
        <div
          key={friend?._id}
          className="flex items-center justify-between py-2 px-5 border rounded-xl bg-[#0D0E0F] border-gray-600"
        >
          <div className="flex gap-x-3 items-center">
            <img
              src={friend?.avatar}
              className="w-10 h-10 rounded-full border border-gray-500"
              alt="Profile"
            />
            <p className="font-bold">{friend?.username}</p>
          </div>
  
    <div className="space-x-2 flex">
          <button className="px-4 py-2 bg-[#813636] rounded-xl">
            Challenge
          </button>

          <button
            onClick={() => unfriend(friend)}
            className="px-4 py-2 bg-[#DFA3A3] text-black rounded-xl"
          >
            Unfriend
          </button>
</div>        </div>
      ))}
      </div>)
      
      
      
      
      }
    </>
  );
}

export default Page;
