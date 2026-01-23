"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "@/public/UserContext";
import Link from "next/link";
function Commentcard({ comment, onDelete }: { comment: any; onDelete: any }) {
  const [commenteduser, setcommented] = useState<any>(null);
  const { user } = useContext(UserContext);

  const getuser = async () => {
    const userres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${comment.userid}`
    );
    const user = await userres.json();
    setcommented(user);
  };

  useEffect(() => {
    getuser();
  }, []);

  return (
    <div className="flex flex-col py-2  gap-y-1  ">
      <div className="flex items-center justify-between text-gray-400">
        <div className="flex items-center gap-x-3">
          {commenteduser === null ? (
            <div className="w-8 h-8 rounded-full bg-gray-500"></div>
          ) : (  <Link
                href={`/profile/${comment.userid}`}
                className=" flex  items-center gap-x-1 hover:cursor-pointer "
              >
            <Image
              src={commenteduser?.avatar}
              alt="avatar"
              width={30}
              height={35}
              className="rounded-full w-8 h-8 object-cover"
            />
            </Link>
          )}
          {commenteduser === null ? (
            <div className="w-20 h-2 rounded-lg bg-gray-500"></div>
          ) : (<Link
                href={`/profile/${comment.userid}`}
                className=" flex  items-center gap-x-1 hover:cursor-pointer "
              >
            <h1 className="">{commenteduser?.username}</h1></Link>
          )}
        </div>
        <div className="flex gap-x-2 items-center">
          {commenteduser?._id === (user as any)?._id && (
            <MdDeleteOutline
              onClick={() => {
                onDelete(comment);
              }}
              size={23}
              className="hover:bg-gray-700 hover:cursor-pointer rounded-full p-1"
            />
          )}
          {commenteduser && (
            <h1 className="text-sm">
              {new Date(comment.createdAt).toLocaleDateString()}{" "}
            </h1>
          )}
        </div>
      </div>
      <div className="mx-10 text-gray-300">
        {commenteduser === null ? (
          <div className="w-30 h-2 rounded-lg bg-gray-500"> </div>
        ) : (
          <h1>{comment.body}</h1>
        )}
      </div>
    </div>
  );
}

export default Commentcard;
