import React from "react";
import Image from "next/image";

const DiscriptionCard = () => {
  return (
    <header className="  bg-[url('/girl.png')] mt-[200px]  flex mx-5 sm:mx-[100px] bg-cover bg-center h-auto overflow-hidden whitespace-wrap rounded-[34px]">
      <h1 className=" p-14 font-Glitch text-4xl text-left my-10">
        <span className=" text-white">Welcome to </span>
        <span className=" text-primary-pink-300">*Something*</span>
        <p className=" font-bold drop-shadow-[3px_2px_0_rgba(0,0,00.25)] pt-6 font-Bomb tracking-[6px] text-primary-white-100  text-2xl leading-loose max-w-[720px]">
          Step into the future of
          <span className=" text-primary-pink-300"> PingPong</span>, prepare for
          a<span className=" text-primary-pink-300 py-4"> thrilling </span>
          experience!
        </p>
      </h1>
      {/* <div className='  mt-20 mx-10'>
        <div className=' font-Glitch  '>
          <h1 className=' text-white text-[40px]'>Welcome to <span className=" text-[40px] text-primary-pink-300">*Something*</span></h1>
        </div>
        <div className=' space-y-6 font-bold drop-shadow-[3px_2px_0_rgba(0,0,00.25)] pt-6 font-Heading tracking-[12px] text-primary-white-100    text-2xl '>
          <p className=' leading-loose max-w-[720px]'>
            Step into the future of 
            <span className=' text-primary-pink-300' > PingPong</span>, 
            prepare for a
            <span className=' text-primary-pink-300 py-4'> thrilling </span>
            experience!
          </p>
        </div> */}

      {/* </div> */}
    </header>
  );
};

export default DiscriptionCard;
