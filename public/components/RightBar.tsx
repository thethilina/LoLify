"use client"
import { UserContext } from "@/public/UserContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import LikeNotifi from "./NotificationBar/LikeNotifi";
import FriendReqNotifi from "./NotificationBar/FriendReqNotifi";

export default function RightNavBar() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!(user as any)?._id) return;

  const fetchNotifications = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/notification?touser=${(user as any)._id}`
    );
    const data = await response.json();

    // Make sure it's an array
    setNotifications(Array.isArray(data.data) ? data.data : []);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    setNotifications([]); 
  }
};


    fetchNotifications();
  }, [(user as any)?._id]);

  
  const likeAndCommentNotifs = notifications.filter(
    (n) => n.type === "like" || n.type === "comment"
  );
  const friendReqNotifs = notifications.filter(
    (n) => n.type === "friend_request"
  );

  return (
    <aside className="hidden sm:block fixed top-16 h-[calc(100vh-4rem)] border-l border-gray-500 w-80">
      <div className="px-7 py-5 border-b border-gray-600">
        <h1 className="font-bold">Notifications</h1>
      </div>

      <div className="px-7 py-4 space-y-4 overflow-y-auto h-full">
      
        {friendReqNotifs.length > 0 &&
          friendReqNotifs.map((notification) => (
            <FriendReqNotifi
              key={notification._id}
              notification={notification}
            />
          ))}

   
        {likeAndCommentNotifs.length > 0 ? (
          likeAndCommentNotifs.map((notification) => (
            <LikeNotifi
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          friendReqNotifs.length === 0 && (
            <p className="text-gray-400">No notifications</p>
          )
        )}
      </div>
    </aside>
  );
}
