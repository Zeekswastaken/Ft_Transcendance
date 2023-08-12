import React from "react";

const GroupCard = () => {
  return (
    <div className=" bg-[#3A0E3B] drop-shadow-[6px_5px_0_rgba(0,0,00.15)] h-[160px] rounded-xl">
      <div className=" h-[40%] bg-[url('/neon-background2.jpeg')] rounded-t-xl bg-cover bg-center "></div>
      <p className=" text-white font-Heading text-xl tracking-widest pt-3 px-4">
        Vestibulum
      </p>
      <div className=" flex justify-between mt-2 items-center">
        <div className=" flex  mx-4 ">
          <div className=" relative rounded-full bg-[url('/avatars/avatar1.png')] bg-cover bg-center w-9 h-9 "></div>
          <div className=" relative rounded-full bg-[url('/avatars/avatar2.png')] bg-cover bg-center w-9 h-9 "></div>
          <div className=" relative rounded-full bg-[url('/avatars/avatar3.png')] bg-cover bg-center w-9 h-9 "></div>
        </div>
        <div className=" flex space-x-2 mx-2">
          <div className=" bg-primary-pink-300 text-base rounded-lg font-Heading tracking-wider text-white py-1 px-3 ">
            <button>Chat</button>
          </div>
          <div className=" bg-[#6E4778] text-base rounded-lg font-Heading tracking-wider text-white py-1 px-3">
            <button>Joind</button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

const Groups = () => {
  return (
    <div className=" border-2 border-primary-pink-300 rounded-[20px]">
      <div className=" glass w-full h-auto  ">
        <div className=" px-20 2xl:px-40 pt-20 pb-12">
          <h1 className="  text-white font-Bomb text-4xl break-all">
            friend list
          </h1>
          <div className=" overflow-auto no-scrollbar my-10 bg-[#2F0331] h-[600px] rounded-3xl">
            <div className="pt-6 pl-20 2xl:pl-40"></div>
            <div className=" mx-20 2xl:mx-40 mt-10 grid grid-cols-1 xl:grid-cols-2 gap-4 ">
              <GroupCard />
              <GroupCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
