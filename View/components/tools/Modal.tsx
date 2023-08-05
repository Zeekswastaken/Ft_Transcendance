import React, { useState } from 'react'
import SelectFriend from './SelectFriend'
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from 'next/navigation';

const OneVsOne:React.FC  = () => {
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
    <div className=' w-auto place-content-center'>
      {clicked ? (
        <div className=" transition-all ease-in duration-200">
            <svg onClick={e => changeState(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className=" cursor-pointer ase-in duration-20 ml-10 w-6 h-6 relative">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
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
              className="inline-flex text-white rounded-lg tracking-wide font-Bomb justify-center p-2 bg-primary-pink-300 capitalize shadow hover:duration-300 shadow-black/60"
              onClick={handleRandomlyOpponent}
            >
              Invite Friend!
            </button>
          </div>
        </div>
        ) : (
          <div className=" flex justify-between items-center space-x-[50px] my-10 ">

            <button onClick={handleFriendOpponent} className=" w-[200px] h-[200px] bg-gradient-to-br from-primary-pink-300 to-black hover:to-white rounded-2xl duration-700">
              <p className=' text-white text-3xl font-Bomb'> Choose Friend </p>
            </button>
            <p className=" font-Bomb text-[50px] text-white ">OR</p>
            <button onClick={handleRandomlyOpponent} className=" w-[200px] h-[200px] bg-gradient-to-br from-primary-pink-300 to-black hover:to-white text-white rounded-2xl  ">
              <p className='  text-3xl font-Bomb'> Choose Randomly </p>
            </button>
          </div>
        )}
    </div>
  )
}

const ModalContent = ({title}: {title : any}) => {
    let content: React.ReactNode ;
    switch (title) {
        case "One Vs One" :
          content = <OneVsOne/>
                {/* One Vs One */}
          break;
        case "One Vs Bot":
          content = 
            <div>
              One Vs Bot
            </div>;
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
