import React from 'react'

function Profilebannar({ userData , user , setcurrentpage }: any) {
  return (
    <div className="relative h-[25vh] lg:h-[25vh]">
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${userData.coverphoto})` }}
      />

  
      <div className="absolute inset-0 bg-black opacity-60"></div>

   
      <div className="flex flex-col h-full  relative z-10   ">

        <div className='flex px-10 pt-5 justify-between h-full items-center  '>
        <div className="flex items-center gap-x-5">
          <img
            src={userData.avatar}
            alt="Avatar"
            className="w-15 h-15  sm:w-24 sm:h-24 lg:w-24 lg:h-24 rounded-full border-2 border-white"
          />
          <div className="flex flex-col gap-y-2">
            <h1 className="sm:text-xl font-bold ">{userData.username}</h1>
            <h1 className="sm:text-lg ">{userData.friends.length} Friends</h1>
          </div>
        </div>
        <h1 className="sm:text-xl font-semibold text-[#CAA155]">{userData.orbs} Orbs</h1>
        </div>

        {/** buttons */}
       
       <div className='flex sm:px-10 sm:py-10  px-4 py-4 gap-x-3  sm:gap-x-5 items-center'>

        <button  onClick={() => setcurrentpage("memes")}  className='bg-[#131316] hover:bg-[#2a2a2d] hover:cursor-pointer py-1 sm:px-2 px-1 rounded-lg border sm:text-lg'>Memes</button>
        <button onClick={() => setcurrentpage("battlehistory")} className='bg-[#131316] hover:bg-[#2a2a2d] hover:cursor-pointer py-1 sm:px-2 px-1  rounded-lg border sm:text-lg'>Battle History</button>
        {user && user._id === userData._id && <button  onClick={()=>{setcurrentpage("settings")}}     className='bg-[#131316] hover:bg-[#2a2a2d] hover:cursor-pointer py-1 sm:px-2 px-1 rounded-lg border sm:text-lg'>Settings</button>}
       </div>

      </div>




    </div>
  )
}

export default Profilebannar


