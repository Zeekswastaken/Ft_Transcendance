import React from 'react'
import SelectFriend from './SelectFriend'
import { useAppSelector } from "@/redux/hooks";

const OneVsOne:React.FC  = () => {
  const avatar = useAppSelector((state) => state.avatarReducer.value);
  return (
    <div className=' w-auto place-content-center'>
      <div className=' flex items-center justify-between my-10 space-x-6'>
        {/* <div className=' rounded-xl'> */}
          <img className=' rounded-xl' src="/Spectate.png" height={120} width={120} alt="" />
        {/* </div> */}
        <p className=' text-white text-[50px] font-Bomb'>VS</p>
        <a className=''>
          <img className=' rounded-xl' src={avatar} alt="avatar" height={120} width={120} />
        </a>
      </div>
      <div className=' mx-8'>
        <SelectFriend />
      </div>  
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
