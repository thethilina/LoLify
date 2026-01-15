"use client"
import Image from 'next/image'
import leaderboard from '../../public/Images/leaderboard.png'
import  b2 from '../../public/Images/Logo.png'
import { useState } from 'react'
import { useEffect } from 'react'

function page() {


const [top3 , getTop3] = useState([])
const [top10 , getTop10] = useState([])


{/** get top 3 and top 10 */}
 useEffect(() => {
    const fetchUsers = async () => {
   
        try {
           const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`);
        const data = await res.json();
        console.log(data);
        getTop3(data.top3)
        getTop10(data.top10)

      } catch (err) {
        console.error(err);
      } finally {

      }
    };
    fetchUsers();

  }, []);


  












  return (
    <div>
 {/** upper board (top 3) */}
<div style={{ position: 'relative', width: '100%', height: '20vh' }}>
  {/* Background image */}
  <Image
    src={leaderboard}
    alt="leaderboard"
    fill
    style={{ objectFit: 'cover' }}
  />


  <Image
    src={b2}
    alt="b2"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  />
</div>



 
    </div>
  )
}

export default page
