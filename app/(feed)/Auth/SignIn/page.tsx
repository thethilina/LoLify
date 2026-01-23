"use client";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";

export default function SignIn() {
  const loader = useTopLoader();
  const [message, setMessage] = useState<string>("");
  const [profilepic, setProfilepic] = useState<File | null>(null);
  const [coverphoto, setCoverphoto] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setProfilepic(e.target.files[0]);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setCoverphoto(e.target.files[0]);
  };

  const setmessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const handleSubmit = async () => {
    try {
      loader.start();
      const maxSize = 5 * 1024 * 1024;

      if (!profilepic || !coverphoto || !username || !email || !age || !password) {
        setmessage("Please fill in all fields");
        loader.done();
        return;
      }

      if (profilepic.size > maxSize) {
        setmessage("Profile picture can't be larger than 5MB");
        loader.done();
        return;
      }

      if (coverphoto.size > maxSize) {
        setmessage("Cover picture can't be larger than 5MB");
        loader.done();
        return;
      }

      const emailRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkemail?email=${email}`);
      if (!emailRes.ok) {
        setmessage("Email is already used");
        loader.done();
        return;
      }

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/checkusername?username=${username}`);
      if (!userRes.ok) {
        setmessage("Username is already taken");
        loader.done();
        return;
      }

      const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`, {
          method: "POST",
          body: formData,
        });
        return await res.json();
      };

      const profilepicUrl = await uploadFile(profilepic);
      if (!profilepicUrl.secure_url) {
        setmessage("Error uploading profile picture");
        loader.done();
        return;
      }

      const coverphotoUrl = await uploadFile(coverphoto);
      if (!coverphotoUrl.secure_url) {
        setmessage("Error uploading cover picture");
        loader.done();
        return;
      }

      const body = {
        avatar: profilepicUrl.secure_url,
        coverphoto: coverphotoUrl.secure_url,
        username,
        email,
        birthdate: age.toString(),
        password,
        orbs: 0,
      };

      const newUserRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const newUserData = await newUserRes.json();
      console.log(newUserData);

      router.push("/Auth/LogIn");
      loader.done();
    } catch (e: any) {
      setmessage("Error during registration");
      console.error("Error during registration:", e.message);
      loader.done();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen gap-8 px-4 text-lg text-[#B9B9CE]">
      <h1 className="text-2xl font-semibold text-[#8f96be] text-center">Welcome to LOLify!</h1>

      <form className="flex flex-col gap-6 w-full max-w-lg">

        {/* Profile Picture */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-20 aspect-square rounded-full flex-shrink-0 bg-gray-500 flex justify-end items-end overflow-hidden">
            {profilepic && (
              <img
                src={URL.createObjectURL(profilepic)}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            )}
            <input
              onChange={handleProfileChange}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <FaCamera className="absolute bottom-1 right-1 bg-gray-800 p-2 rounded-full hover:bg-gray-900 border border-gray-400" />
          </div>
          <span className="text-center sm:text-left flex-1">Set Your Avatar</span>
        </div>

        {/* Cover Photo */}
        <div className="flex flex-col gap-2">
          <span>Set Your Cover Photo</span>
          <div className="relative w-full max-w-lg aspect-[16/9] rounded-lg bg-gray-600 flex justify-end items-end overflow-hidden">
            {coverphoto && (
              <img
                src={URL.createObjectURL(coverphoto)}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
            )}
            <input
              onChange={handleCoverChange}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <FaCamera className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full hover:bg-gray-900 border border-gray-400" />
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="flex-1 rounded-xl py-2 px-4 bg-[#333333] focus:outline-none focus:border-[#878b87]"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="flex-1 rounded-xl py-2 px-4 bg-[#333333] focus:outline-none focus:border-[#878b87]"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            type="number"
            placeholder="Age"
            className="flex-1 rounded-xl py-2 px-4 bg-[#333333] focus:outline-none focus:border-[#878b87]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="flex-1 rounded-xl py-2 px-4 bg-[#333333] focus:outline-none focus:border-[#878b87]"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
          <Link href="/Auth/LogIn" className=" text-[#A7A7D4] hover:underline">
            Already a member? Log In
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-[#4b4679] hover:bg-[#6d62cf] py-2 px-6 rounded-xl text-white font-medium"
          >
            Sign Up
          </button>
        </div>

      </form>

      {message && <div className="text-red-500 font-medium text-center">{message}</div>}
    </div>
  );
}
