"use client"
import { useState, useEffect } from 'react'
import MemeCard from '@/public/components/Feed/MemeCard';
import { useParams } from "next/navigation";
import Comment from '@/public/components/Feed/comment';
import loading from "../../../../public/Images/loading2.gif"
import Image from 'next/image';
function page({ params }: any) {

  const { memeid } = useParams();
  const [meme, setMeme] = useState<any>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {

    getmeme()


  }, []


  )

  const removeMeme = (meme: any) => {

    setMeme(null)

  }

  const getmeme = async () => {

    setLoading(true)
    try {

      const memeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/memebyid?memeid=${memeid}`)
      const meme = await memeres.json()
      setMeme(meme);


    } catch (e: any) {

      console.log("error " + e.message)
    } finally {
      setLoading(false)
    }



  }


  return (
    <div className='flex flex-col  gap-y-5 items-center justify-center'>
      {isLoading && <div className="flex flex-col gap-y-4 justify-center text-green-800 items-center"><Image src={loading} alt="loading" width={170} height={170} /><h1 className="text-xl font-semibold">Loading</h1></div>}

      {meme && <MemeCard meme={meme} isOpen={true} removememe={removeMeme} />}
    </div>
  )
}

export default page
