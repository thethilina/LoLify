import React from 'react'





function Profilebannar({ userData , user , setcurrentpage  , friendStatus ,setFriendStatus}: any) {




const addfrined = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request?byuserid=${user._id}&touserid=${userData._id}`,
      {
        method: "POST",
        credentials: "include",
      
          
     
      }
    );

    const data = await res.json();

    console.log(data)
    if (!res.ok) throw new Error(data.message);

 
    setFriendStatus({
      status: "request_sent",
      requestId: data.Friend_request?._id || null,
    });

  } catch (err) {
    console.error(err);
  }
};


const cancelrequest = async () => {
  if (!friendStatus.requestId) {
    console.error("No request ID found for cancellation.");
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request?requestId=${friendStatus.requestId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("Cancel request response:", data);

    if (!res.ok) throw new Error(data.message);

    setFriendStatus({
      status: "none",
      requestId: null,
    });

  } catch (err) {
    console.error("Error cancelling request:", err);
  }
};

const unfriend = async () => {
  if (!friendStatus || friendStatus.status !== "friends") {
    console.error("Cannot unfriend, not currently friends.");
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request/removefriends?userId=${user._id}&usertoremoveId=${userData._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("Unfriend response:", data);

    if (!res.ok) throw new Error(data.message);

    setFriendStatus({
      status: "none",
      requestId: null,
    });

  } catch (err) {
    console.error("Error unfriending user:", err);
  }
};


const acceptrequest = async () => {
  if (!friendStatus.requestId) {
    console.error("No request ID available to accept.");
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/friend_request?requestId=${friendStatus.requestId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("Accept request response:", data);

    if (!res.ok) throw new Error(data.message);

  
    setFriendStatus({
      status: "friends",
      requestId: null,
    });

  } catch (err) {
    console.error("Error accepting request:", err);
  }
};














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
          <div className="flex flex-col gap-y-3">
            <h1 className="sm:text-xl font-bold ">{userData.username}</h1>
             {user && user._id !== userData._id && friendStatus.status === "friends" && <button onClick={unfriend} className='bg-[#aa402e] hover:bg-[#70281c] hover:cursor-pointer px-2 py-1 rounded-lg border '>Unfriend</button>}
          {user && user._id !== userData._id && friendStatus.status === "request_sent" && <button onClick={cancelrequest} className='bg-[#aaa02e] hover:bg-[#706e1c] hover:cursor-pointer  py-1  px-2 rounded-lg border '>Cancel Request</button>}
          {user && user._id !== userData._id && friendStatus.status === "none" && <button onClick={addfrined} className='bg-[#1a3f1c] hover:bg-[#2e4d25] hover:cursor-pointer py-1   px-2 rounded-lg border '>Add Friend</button>}
          {user && user._id !== userData._id && friendStatus.status === "request_received" && <button onClick={acceptrequest} className='bg-[#2eaa6d] hover:bg-[#1c7060] hover:cursor-pointer py-1 px-2 rounded-lg border '>Accept Request</button>}
         
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


