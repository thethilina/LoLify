"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import leaderboard from "../../public/Images/leaderboard.png"
import loading from "../../public/Images/loading2.gif"

function Page() {
  const [top3, setTop3] = useState<any[]>([])
  const [top10, setTop10] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`
        )
        const data = await res.json()

        setTop3(data.top3)
        setTop10(data.top10)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center text-green-800 h-screen">
        <Image src={loading} alt="loading" width={170} height={170} />
        <h1 className="text-xl font-semibold">Loading</h1>
      </div>
    )
  }

  return (
    <div>
      {/* Top 3 section */}
      <div
        className="relative w-full h-[20vh] lg:h-[30vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${leaderboard.src})` }}
      >
        <div className="flex gap-x-4 lg:gap-x-8 items-center justify-center h-full">
          {top3.map((user: any) => (
            <div key={user._id} className="flex flex-col items-center">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 lg:w-24 lg:h-24 rounded-full border object-cover"
              />
              <h2 className="text-white mt-2 font-bold text-center">
                {user.username}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 list */}
      <div className="flex flex-col gap-5 p-3 mt-8">
        {top10.map((user: any) => (
          <div
            key={user._id}
            className="flex justify-between items-center px-10 py-4 bg-[#0F0F11] rounded-full hover:bg-[#1c1c1e] cursor-pointer"
          >
            <div className="flex items-center gap-x-5">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full border object-cover"
              />
              <h3 className="font-semibold">{user.username}</h3>
            </div>

            <h1 className="font-bold">{user.orbs}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
