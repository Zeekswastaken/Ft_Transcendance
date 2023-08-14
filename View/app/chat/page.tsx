import React from 'react'
import ChatList from './chatList';
import ChatListMobil from './chatListMobil';
import Board from './board';
import ChatContent from './chatContent';

const page = () => {
  return (
    <div className=" w-screen h-screen">
    <div className=" mt-[150px] h-[85%] flex gap-4 justify-center mx-8"> {/* chat and friends */}
      <ChatList />
      <ChatContent />
    </div>
    {/* <div className="md:mt-[150px] max-sm:w-full max-sm:block hidden h-[90%] gap-2 justify-center mt-[90px] ">  */}
      {/* <ChatListMobil /> */}
      {/* <ChatContent /> */}
    {/* </div> */}
  </div>
  );
  }
  
  export default page