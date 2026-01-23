"use client";
import React, { useEffect, useState } from "react";
import { PiEmptyBold } from "react-icons/pi";
import loading from "../../../public/Images/loading2.gif" 
import Image from "next/image";


function Battlehistory({ userid }: { userid: string }) {
  const [battles, setBattles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBattles = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/getbyuser?userId=${userid}`
        );
        if (!response.ok) throw new Error("Failed to fetch battles");

        const data = await response.json();
        setBattles(data.data || []);
      } catch (error) {
        console.error("Error fetching battles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBattles();
  }, [userid]);



  if (isLoading) {
    return <div className="flex flex-col gap-y-4 justify-center text-green-800 items-center"><Image src={loading} alt="loading" width={170} height={170} /><h1 className="text-xl font-semibold">Loading</h1></div>;
  }

  if (!isLoading && battles.length === 0) {
    return (
      <div className="flex  flex-col gap-y-4 justify-center items-center text-gray-400 py-10">
        <PiEmptyBold size={80} />
        <h1 className="text-xl font-semibold">
          The user hasn&apos;t fought yet.
        </h1>
      </div>
    );
  }



  return (
    <div className="space-y-3 ">
      {battles.map((battle) => {
        const isWin = battle.result === "Win";
        const isLoss = battle.result === "Loss";
        const isDraw = battle.result === "Draw";

        return (
          <div
            key={battle._id}
            className={`flex items-center gap-4 px-4  py-3 rounded-xl border
              ${isWin && "bg-green-500/10 border-green-500/40"}
              ${isLoss && "bg-red-500/10 border-red-500/40"}
              ${isDraw && "bg-yellow-500/10 border-yellow-500/40"}
            `}
          >
          
            <img
              src={battle.opponent.avatar}
              alt={battle.opponent.username}
              className="w-12 h-12 rounded-full object-cover"
            />

    
            <div className="flex-1">
              <p className="font-semibold text-white">
                {battle.opponent.username}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(battle.date).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`text-sm font-bold
                ${isWin && "text-green-400"}
                ${isLoss && "text-red-400"}
                ${isDraw && "text-yellow-400"}
              `}
            >
              {battle.result}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Battlehistory;
