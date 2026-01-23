"use client"
import React from 'react'
import { useState, useEffect } from "react"
import MemeCard from '@/public/components/Feed/MemeCard'
import Image from "next/image"
import loading from "../../../public/Images/loading2.gif" 
import { PiEmptyBold } from "react-icons/pi";


function Profilememes({userid} : any) {

  const [memes, setMemes] = useState<any>([])
  const [isLoading, setLoading] = useState(false)




  const fetchmeme = async () => {

    setLoading(true)
    try {

      const memesres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/memebyuserid?userid=${userid}`)

      const memes = await memesres.json();
      setMemes(memes)
      console.log(memes)

    } catch (e: any) {
      console.log(e.message)

    } finally {

      setLoading(false)
    }


  }

  useEffect(
    () => {
      fetchmeme()
    }, []

  )

  const removeMeme = (meme: any) => {

    setMemes((prev: any) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.filter((c: any) => c._id !== meme._id);
    });


  }

  return (



    <div className="flex flex-col w-full items-center    gap-y-5">

      {isLoading && <div className="flex flex-col gap-y-4 justify-center text-green-800 items-center"><Image src={loading} alt="loading" width={170} height={170} /><h1 className="text-xl font-semibold">Loading</h1></div>}
        {!isLoading && memes.length === 0 && <div className="flex flex-col gap-y-4 justify-center text-gray-400 items-center"><PiEmptyBold size={80} /><h1 className="text-xl font-semibold">No Memes Yet</h1></div>}
      {memes.map((meme: any) => {
        return (

          <MemeCard meme={meme} isOpen={false} removememe={removeMeme} />

        )
      })
      }



    </div>
  )
}

export default Profilememes