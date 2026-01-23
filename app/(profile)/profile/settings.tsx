"use client";

import React, { useState, useContext } from "react";
import { UserContext } from "@/public/UserContext";
import { useTopLoader } from "nextjs-toploader";
import { useRouter } from "next/navigation";

function Settings({ userid }: any) {
  const { user, setUser } = useContext(UserContext);
  const loader = useTopLoader();
  const router = useRouter();

  // username
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [newUsername, setNewUsername] = useState((user as any)?.username || "");

  // avatar
  const [editAvatarMode, setEditAvatarMode] = useState(false);
  const [newAvatar, setNewAvatar] = useState((user as any)?.avatar || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // cover
  const [editCoverMode, setEditCoverMode] = useState(false);
  const [newCover, setNewCover] = useState((user as any)?.coverphoto || "");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  /* ---------------- UPLOAD + UPDATE (REUSABLE) ---------------- */

  const uploadAndUpdate = async (
    file: File,
    field: "avatar" | "coverphoto",
    closeModal: () => void
  ) => {
    try {
      loader.start();

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File exceeds 5MB limit");
        loader.done();
        return;
      }

      // upload image
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!uploadRes.ok) throw new Error("Upload failed");

      const image = await uploadRes.json();

      // update user
      const patchRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/protected?userId=${userid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fieldToEdit: field,
            newValue: image.secure_url,
          }),
        }
      );

      if (!patchRes.ok) throw new Error("Update failed");

      const updatedUser = await patchRes.json();
      setUser(updatedUser);

      closeModal();
      loader.done();
    } catch (e) {
      console.error(e);
      alert("Error updating image");
      loader.done();
    }
  };

  /* ---------------- USERNAME ---------------- */

  const editUsername = async () => {
    try {
      loader.start();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/protected?userId=${userid}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fieldToEdit: "username",
            newValue: newUsername,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update username");

      const updatedUser = await response.json();
      setUser(updatedUser);

      setEditUsernameMode(false);
      loader.done();
    } catch (error) {
      console.error("Error updating username:", error);
      loader.done();
    }
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = async () => {
    try {
      loader.start();

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.refresh();
      router.push("/");
      loader.done();
    } catch (e: any) {
      console.log("error logging out " + e.message);
      loader.done();
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-10 lg:w-1/2">
      <h1 className="text-xl font-semibold">Choose how you appear</h1>
      <p>Signed in as {(user as any)?.email}</p>

      <div className="space-y-10">
        {/* Username */}
        <div
          onClick={() => setEditUsernameMode(true)}
          className="flex justify-between items-center hover:bg-[#222121] px-2 py-1 rounded-lg cursor-pointer"
        >
          <h2 className="text-lg">Display Name</h2>
          <h2>{(user as any)?.username} ✎</h2>
        </div>

        {/* Avatar */}
        <div className="space-y-4">
          <h2 className="text-lg">Your Avatar</h2>
          <img
            onClick={() => {
              setNewAvatar((user as any)?.avatar);
              setEditAvatarMode(true);
            }}
            src={(user as any)?.avatar}
            className="w-24 h-24 rounded-full border-2 border-white cursor-pointer object-cover"
          />
        </div>

        {/* Cover */}
        <div className="space-y-4">
          <h2 className="text-lg">Your Cover Photo</h2>
          <img
            onClick={() => {
              setNewCover((user as any)?.coverphoto);
              setEditCoverMode(true);
            }}
            src={(user as any)?.coverphoto}
            className="w-full h-48 rounded-lg border-2 border-white object-cover cursor-pointer"
          />
        </div>

        {/* Logout */}
        <h1
          onClick={handleLogout}
          className="text-red-900 font-semibold text-lg cursor-pointer"
        >
          Log Out
        </h1>
      </div>

      {/* ---------------- Username Modal ---------------- */}
      {editUsernameMode && (
        <div
          onClick={() => setEditUsernameMode(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F0F11] border border-gray-600 rounded-xl p-6 w-full max-w-sm space-y-5"
          >
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              type="text"
              className="w-full border border-gray-500 rounded-xl py-3 px-4 bg-[#1F1F24] focus:outline-none"
              autoFocus
            />
            <button
              onClick={editUsername}
              className="w-full bg-[#4b4679] hover:bg-[#6d62cf] py-2 rounded-xl font-medium transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Avatar Modal ---------------- */}
      {editAvatarMode && (
        <div
          onClick={() => setEditAvatarMode(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F0F11] border border-gray-600 rounded-xl p-6 w-full max-w-sm space-y-5"
          >
            <img
              src={newAvatar}
              className="w-24 h-24 rounded-full mx-auto border-2 border-white object-cover"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewAvatar(URL.createObjectURL(e.target.files[0]));
                  setAvatarFile(e.target.files[0]);
                }
              }}
              className="w-full border border-gray-500 rounded-xl py-3 px-4 bg-[#1F1F24] focus:outline-none"
            />

            <button
              onClick={() =>
                uploadAndUpdate(
                  avatarFile!,
                  "avatar",
                  () => setEditAvatarMode(false)
                )
              }
              className="w-full bg-[#4b4679] hover:bg-[#6d62cf] py-2 rounded-xl font-medium transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Cover Modal ---------------- */}
      {editCoverMode && (
        <div
          onClick={() => setEditCoverMode(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F0F11] border border-gray-600 rounded-xl p-6 w-full max-w-lg space-y-5"
          >
            <img
              src={newCover}
              className="w-full h-40 rounded-lg border-2 border-white object-cover"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewCover(URL.createObjectURL(e.target.files[0]));
                  setCoverFile(e.target.files[0]);
                }
              }}
              className="w-full border border-gray-500 rounded-xl py-3 px-4 bg-[#1F1F24] focus:outline-none"
            />

            <button
              onClick={() =>
                uploadAndUpdate(
                  coverFile!,
                  "coverphoto",
                  () => setEditCoverMode(false)
                )
              }
              className="w-full bg-[#4b4679] hover:bg-[#6d62cf] py-2 rounded-xl font-medium transition"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
