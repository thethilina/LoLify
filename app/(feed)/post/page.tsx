"use client"
import Image from "next/image";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useTopLoader } from 'nextjs-toploader';
import { UserContext } from "@/public/UserContext";
import { useContext } from "react";

export default function Page() {

  const loader = useTopLoader();
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState("")
  const [meme, setMeme] = useState<any>(null)
  const [memefile, setmemefile] = useState<any>(null);
  const [taglines, setLines] = useState<any>([])
  const [isOpen, setOpen] = useState(false)
  const [temptag, settempTag] = useState("")
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);


  const setmessage = (msg: string) => {

    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);


  }
  const handlesettile = () => {

    if (temptag === "") {
      setOpen(false)
      return
    }

    setLines((prev: any) => [...prev, temptag])
    settempTag("")
    setOpen(false)

  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setmemefile(file)
      const memeurl = URL.createObjectURL(file)
      setMeme(memeurl)
    }
  };

  const handleremovetag = (tag: any) => {

    setLines((prev: any) => prev.filter((taglines: any) => taglines !== tag));


  }


  const handlepost = async () => {

    try {

      loader.start()

      const maxSize = 5 * 1024 * 1024;

      if (!title || !meme) {
        setmessage("Please fill in all fields");
        loader.done()
        return;
      }

      if (meme.size > maxSize) {

        setmessage("Meme can't be larger than 5MB");
        loader.done()
        return
      }

      const cp = new FormData();
      cp.append("file", memefile);
      const coverphotoResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`, {
        method: "POST",
        body: cp
      });
      const memeUrl = await coverphotoResponse.json();

      const body = {
        "memetitle": title,
        "taglines": taglines,

        "memeimg": memeUrl.secure_url,
        "userid": (user as any)._id

      }

      const memeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include",
      })

      loader.done()
      router.push("/")
    } catch (e: any) {

      setmessage("Error during posting meme")
      loader.done()
      return

    }


  }


return (
  <div className=" flex flex-col items-center justify-center gap-y-6 px-4 py-8 text-[#B9B9CE] ">

    <h1 className="text-xl md:text-2xl font-semibold">Post Memes</h1>

    <div className="w-full max-w-xl flex flex-wrap gap-3 justify-center md:justify-start">
      {taglines.map((tag: any) => (
        <div
          key={tag}
          className="flex items-center gap-x-2 bg-gray-800 px-3 py-1.5 rounded-xl text-sm whitespace-nowrap"
        >
          <span>{tag}</span>
          <MdCancel
            onClick={() => handleremovetag(tag)}
            size={15}
            className="hover:cursor-pointer text-gray-400 hover:text-white"
          />
        </div>
      ))}
    </div>

    <input
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      type="text"
      placeholder="Title"
      className="w-full max-w-xl border border-gray-500 rounded-xl py-3 px-4 bg-[#1F1F24] focus:border-[#878b87] focus:outline-none text-base"
    />

    <button
      onClick={() => setOpen(!isOpen)}
      className="bg-[#303030] hover:bg-[#444444] px-6 py-2 rounded-2xl text-sm font-medium transition"
    >
      Add Tags
    </button>

    {meme ? (
      <div className="relative w-full max-w-xl aspect-square md:aspect-auto md:h-96 bg-[#0c0c0c] rounded-xl overflow-hidden border-2 border-dotted border-gray-600">
        <MdOutlineDelete
          size={30}
          className="absolute top-3 right-3 z-10 hover:cursor-pointer p-1 bg-gray-900/90 rounded-full text-gray-300 hover:bg-gray-800"
          onClick={() => setMeme(null)}
        />
        <Image
          src={meme}
          fill
          className="object-contain"
          alt="uploaded meme"
        />
      </div>
    ) : (
      <div className="relative w-full max-w-xl h-64 md:h-80 bg-[#1F1F24] border-2 border-dotted border-gray-500 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#252529] transition">
        <input
          onChange={handleProfileChange}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <LuUpload size={36} />
        <h1 className="text-lg">Attach Your Meme</h1>
      </div>
    )}

    <button
      onClick={handlepost}
      className="w-full max-w-xl mt-4 bg-[#4b4679] hover:bg-[#6d62cf] font-medium py-3 rounded-xl text-lg transition"
    >
      Post
    </button>

    {message && <div className="text-red-500 font-medium">{message}</div>}

    {isOpen && (
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0F0F11] border border-gray-600 rounded-xl p-6 w-full max-w-sm space-y-5"
        >
          <input
            onChange={(e) => settempTag(e.target.value)}
            type="text"
            placeholder="tagline"
            className="w-full border border-gray-500 rounded-xl py-3 px-4 bg-[#1F1F24] focus:border-[#878b87] focus:outline-none"
            autoFocus
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlesettile();
            }}
            className="w-full bg-[#4b4679] hover:bg-[#6d62cf] py-2 rounded-xl font-medium transition"
          >
            Add
          </button>
        </div>
      </div>
    )}
  </div>
);













}