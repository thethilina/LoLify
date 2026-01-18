import React, { useState } from "react";
import Link from "next/link";

function LikeNotifi({ notification }: { notification: any }) {
  if (!notification.memeid?._id) {
    return null;
  }

  const [viewed, setViewed] = useState(
    notification.status === "viewed"
  );

  return (
    <Link
      href={`/Meme/${notification.memeid._id}`}
      className="flex items-center gap-x-1"
      onClick={() => setViewed(true)} 
    >
      <div
        className={`rounded-2xl p-3 w-150 flex items-center gap-x-3 transition
          ${
            viewed
              ? "bg-[#1F1F24] opacity-60"
              : "bg-[#2A2A35] hover:bg-[#31313a]"
          }`}
      >
        <img
          src={notification.auser.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <p
          className={`text-sm ${
            viewed ? "text-gray-500" : "text-gray-300"
          }`}
        >
          {notification.body}
        </p>

        <span
          className={`text-xs ${
            viewed ? "text-gray-600" : "text-gray-400"
          }`}
        >
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </Link>
  );
}

export default LikeNotifi;
