import React, { useState } from 'react'
import SelectFriend from './SelectFriend'
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
// import ionicon from 'ionicons';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';
// import { Navigation, Pagination, EffectCoverflow } from 'swiper';

interface Props {
  title: string

}

const OneVsOne:React.FC<Props> = ({ title }) => {
  const router = useRouter();

  const [clicked, setClicked] = useState(false);
  const handleRandomlyOpponent= (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push("/game");
    
  }
  const handleFriendOpponent = (e: React.MouseEvent<HTMLElement>) => {
    setClicked(true);
  }
  const changeState = (state:boolean) => {
    setClicked(state);
  }

  const avatar = useAppSelector((state) => state.avatarReducer.value);
  return (
    <div className=" w-auto place-content-center">
      <h3 className="text-[40px] mt-2 font-Bomb leading-6 text-white tracking-wide"> {title} </h3>
      {clicked ? (
        <div className="">
            <svg onClick={e => changeState(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className=" cursor-pointer ase-in duration-20 ml-10 w-6 h-6  absolute left-10 top-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            <div className=' flex items-center justify-between my-10 space-x-6'>
              <img className=' rounded-xl' src="/Spectate.png" height={120} width={120} alt="" />
              <p className=' text-white text-[50px] font-Bomb'>VS</p>
              <img className=' rounded-xl' src={avatar} alt="avatar" height={120} width={120} />
            </div>
            <SelectFriend />
          <div className="mt-4 space-x-4">
            <button
              type="button"
              className="inline-flex text-white rounded-lg tracking-wide font-Bomb justify-center p-2 bg-primary-pink-300 capitalize shadow duration-300 hover:shadow-black/60"
              onClick={handleRandomlyOpponent}
            >
              Invite Friend!
            </button>
          </div>
        </div>
        ) : (
          <div className=" flex justify-between items-center space-x-[50px] my-10 ">

            <button onClick={handleFriendOpponent} className=" drop-shadow-xl w-[200px] h-[200px] bg-gradient-to-b from-primary-pink-300 to-[#0d0d0d] hover:to-white hover:from-50% rounded-2xl">
              <p className=' text-white text-3xl font-Bomb'> Choose Friend </p>
            </button>
            <p className=" font-Bomb text-[50px] text-white ">OR</p>
            <button onClick={handleRandomlyOpponent} className="  w-[200px] hover:from-50% h-[200px] duration-300 bg-gradient-to-b  from-primary-pink-300 to-[#0d0d0d] hover:to-white text-white rounded-2xl  ">
              <p className='  text-3xl font-Bomb'> Choose Randomly </p>
            </button>
          </div>
        )}
    </div>
  )
};

const OneVsBot:React.FC<Props> = ({ title }) => {

  const router = useRouter();
  const handelChoosenBot = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push("/game");
  }

  return (
    <div className=" w-auto place-content-center backdrop-blur-sm">
      <h3 className="text-[40px] mt-2 font-Bomb leading-6 text-gray-100 tracking-wide"> {title} </h3>
      <div className='font-Bomb text-3xl tracking-wide text-white  my-10 flex space-x-6 '>
            <button onClick={handelChoosenBot} className=" shadow-xl hover:shadow-green-300 hover:text-green-100 duration-300 brightness-100 bg-[url('/easy.jpeg')]  bg-cover bg-center  h-[250px] w-[180px] rounded-3xl">
              <p className=" mt-[200px]">EASY</p>
            </button>
            <button onClick={handelChoosenBot} className=" shadow-xl hover:shadow-yellow-300 hover:text-yellow-100 duration-300 bg-[url('/meduim.jpeg')] bg-cover bg-center h-[250px] w-[180px] rounded-3xl ">
              <p className="mt-[200px]" >Medium</p>
            </button>
            <button onClick={handelChoosenBot} className=" shadow-xl hover:shadow-red-400 hover:text-red-100 duration-300 bg-[url('/hard.jpeg')] bg-cover bg-center h-[250px] w-[180px] rounded-3xl">
              <p className="mt-[200px]">Hard</p>
            </button>
          <div className="slider-container">
          </div>
      </div>
    </div>
    )
}


const ModalContent:React.FC<Props> = ({title}) => {
    let content: React.ReactNode ;
    switch (title) {
        case "One Vs One" :
          content = <OneVsOne title={title}/>
          break;
        case "One Vs Bot":
          content = <OneVsBot title={title}/>
          break;
        case "Spectate" :
          content =
            <div>
              Spectate
            </div>
      }
  return (
    <>
        {content}
    </>
  )
}

export default ModalContent
