"use client";

import { useContext } from "react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { UserContext } from "@/public/UserContext";
import { AiOutlineDislike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import Comment from "./comment";
import Link from "next/link";
import { useRouter } from "next/navigation";

function MemeCard({
  meme,
  isOpen,
  removememe,
}: { meme: any;
  isOpen: boolean;
  removememe: any;
}) {
  const { user, setUser } = useContext(UserContext);
  const [memeuser, setmemeUser] = useState<any>(null);
  const [isliked, setisliked] = useState(false);
  const [isdisliked, setisdisliked] = useState(false);
  const [likecount, setlikecount] = useState(0);
  const [dislikecount, setdislikecount] = useState(0);
  const [commentcount, setcommentcount] = useState(0);
  const [comments, setComments] = useState<any>([]);
  const [dotbar, setdotbar] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  {
    /* like and undo function */
  }

  const setcommentCount = (e: number) => {
    setcommentcount(commentcount + e);
  };

  const like = async () => {
    if (!user) {
      router.push("/Auth/LogIn");
      return;
    }

    undislike();
    setisliked(true);
    setlikecount(likecount + 1);

    const likeres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected/likememe?userId=${(user as any)?._id
      }&memeId=${meme._id}`,
      {
        method: "POST",

        credentials: "include",
      }
    );

    if (!likeres.ok) {
      console.log("error liking meme");
      return;
    }
  };
  const unlike = async () => {
    if (!isliked) {
      return;
    }

    setisliked(false);
    setlikecount(likecount - 1);
    const likeres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL
      }/memes/protected/likememe/undo?userId=${(user as any)?._id}&memeId=${meme._id
      }`,
      { method: "POST", credentials: "include" }
    );
    if (!likeres.ok) {
      alert("Error");
      return;
    }
  };

  {
    /* dislike and undo function */
  }

  const dislike = async () => {
    if (isdisliked) {
      return;
    }

    if (!user) {
      router.push("Auth/LogIn");
      return;
    }

    unlike();
    setisdisliked(true);
    setdislikecount(dislikecount + 1);

    const likeres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected/dislikememe?userId=${(user as any)?._id
      }&memeId=${meme._id}`,
      {
        method: "PATCH",

        credentials: "include",
      }
    );

    if (!likeres.ok) {
      console.log("error dislining meme");
      return;
    }
  };
  const undislike = async () => {
    if (!isdisliked) {
      return;
    }
    setisdisliked(false);
    setdislikecount(dislikecount - 1);
    const likeres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL
      }/memes/protected/dislikememe/undo?userId=${(user as any)?._id}&memeId=${meme._id
      }`,
      { method: "PATCH", credentials: "include" }
    );
    if (!likeres.ok) {
      alert("Error");
      return;
    }
  };

  {
    /* get meme posted user */
  }
  const getuser = async () => {
    setlikecount(meme.likecount.length);
    setdislikecount(meme.dislikecount.length);
    const userres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${meme.userid}`
    );
    const user = await userres.json();
    setmemeUser(user);
  };

  const deletememe = async () => {
    try {
      if (!user) {
        router.push("/Auth/LogIn");
        return;
      }

      if (isOpen) {
        router.push("/");
      }
      removememe(meme);

      const deletememeres = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected?memeId=${meme._id}`,
        { method: "DELETE", credentials: "include" }
      );

      console.log(await deletememeres.json());
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const fetchcomments = async () => {
    try {
      const commentres = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments?memeId=${meme._id}`,
        { credentials: "include" }
      );
      const comments = await commentres.json();
      setComments(comments);
      setcommentcount(comments.length);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getuser();
    fetchcomments();
  }, []);

  useEffect(() => {
    if (!user) return;

    if (meme.likecount.includes((user as any)._id)) {
      setisliked(true);
    }

    if (meme.dislikecount.includes((user as any)._id)) {
      setisdisliked(true);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setdotbar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sm:w-200 w-full ">
      <div className="border border-gray-500 rounded-lg p-5   bg-[#17171b]  gap-y-3 flex flex-col">
        {/* upper meme section */}
        <div className="flex justify-between items-center px-2 ">
          <div className="flex items-center gap-x-3">
            {memeuser === null ? (
              <div className="w-8 h-8 bg-gray-500 rounded-full" />
            ) : (
              <Image
                src={memeuser?.avatar}
                alt="useravatar"
                width={30}
                height={30}
                className="rounded-full border w-8 h-8 object-cover border-gray-500"
              />
            )}
            {memeuser === null ? (
              <div className="w-15 h-2 rounded-lg bg-gray-500" />
            ) : (
              <h1>{memeuser?.username}</h1>
            )}
          </div>
          <div className="flex gap-x-2 items-center">
            <h1 className="text-sm">
              {new Date(meme.createdAt).toLocaleDateString()}
            </h1>
            <HiDotsVertical
              onClick={() => {
                setdotbar(true);
              }}
              size={22}
              className="hover:bg-gray-800  hover:cursor-pointer rounded-full p-1"
            />
            {dotbar && (
              <div
                ref={menuRef}
                className=" text-gray-3  text-sm 00 absolute w-30 flex items-center justify-center  bg-gray-950 p-1 mt-15 ml-1 rounded-xl border border-gray-800"
              >
                {(user as any)?._id === memeuser?._id ? (
                  <h1 onClick={deletememe} className="hover:cursor-pointer">
                    Delete
                  </h1>
                ) : (
                  <Link href={"/Report"}>
                    {" "}
                    <h1 className="hover:cursor-pointer">Report Meme</h1>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* tags */}

        <div className="flex gap-x-3 px-2 text-blue-200">
          {meme.taglines !== 0 &&
            meme.taglines.map((tag: any) => {
              return <Link href={`/Meme/Search/${tag}`}  className="hover:cursor-pointer"  ><h1 className="">#{tag}</h1></Link>;
            })}
        </div>

        <h1 className="px-2 font-semibold">{meme.memetitle}</h1>

        {/* image*/}

        <div className="bg-black h-100 w-full rounded-lg">
          <Image
            src={meme.memeimg}
            alt="meme"
            width={150}
            height={150}
            className="h-100 w-full object-contain  "
          />
        </div>

        {/* buttons bottom */}
        <div className="flex gap-x-3 mx-2 items-center">
          {/* like button */}

          {isliked ? (
            <button className=" flex  items-center gap-x-1 " onClick={unlike}>
              <AiOutlineLike
                className="bg-[#2e2e35] rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer"
                size={35}
              />{" "}
              {likecount !== 0 && <h1>{likecount}</h1>}
            </button>
          ) : (
            <button className="flex  items-center" onClick={like}>
              <AiOutlineLike
                className=" rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer"
                size={35}
              />{" "}
              {likecount !== 0 && <h1>{likecount}</h1>}
            </button>
          )}

          {/* dislike button */}

          {isdisliked ? (
            <button
              onClick={undislike}
              className=" flex  items-center gap-x-1 "
            >
              <AiOutlineDislike
                className="bg-[#2e2e35] rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer"
                size={35}
              />{" "}
              {dislikecount !== 0 && <h1></h1>}
            </button>
          ) : (
            <button onClick={dislike} className=" flex  items-center ">
              <AiOutlineDislike
                className=" rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer"
                size={35}
              />
              {dislikecount !== 0 && <h1></h1>}
            </button>
          )}

          <button className="">
            {!isOpen ? (
              <Link
                href={`/Meme/${meme._id}`}
                className=" flex  items-center gap-x-1 hover:cursor-pointer "
              >
                <LiaCommentSolid size={20} />
                {commentcount !== 0 && <h1>{commentcount}</h1>}
              </Link>
            ) : (
              <button className=" flex  items-center gap-x-1 ">
                <LiaCommentSolid size={20} />
                {commentcount !== 0 && <h1>{commentcount}</h1>}
              </button>
            )}
          </button>
        </div>
      </div>
      <div className="mt-5">
        {isOpen && <Comment meme={meme} setcomment={setcommentCount} />}
      </div>
    </div>
  );
}

export default MemeCard;




