"use client";
import React, { useState, useEffect, use } from "react";
import { UserContext } from "@/public/UserContext";
import { useContext } from "react";
import Profilebannar from "../profilebannar";
import Profilememes from "../profilememes";
import Battlehistory from "../battlehistory";
import Settings from "../settings";






function Page({ params }: { params: Promise<{ userid: string }> }) {


  const { userid } = use(params); 
  const [userData, setUserData] = useState<any>(null);
  const { user, setUser } = useContext(UserContext);
  const [currentpage, setCurrentpage] = useState<string>("memes");


  useEffect(() => {
    if (!userid) return;
    async function fetchUserData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${userid}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [userid]);

  return (
    <div>


      {userData ? (



        <div>
        <Profilebannar userData={userData} user={user} setcurrentpage={setCurrentpage} /> 
        <div className="p-10">
          {currentpage === "memes" && <Profilememes userid={userid} />}
          {currentpage === "battlehistory" && <Battlehistory userid={userid} />}
          {currentpage === "settings" && <Settings userid={userid} user={user} setuser={setUser} />}
        



        </div>
        </div>
      


      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Page;
