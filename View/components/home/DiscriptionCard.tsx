import React from 'react'
import Image from 'next/image';

const DiscriptionCard = () => {
  return (
    <header className="  bg-[url('/girl.png')] mt-[200px] flex mx-[100px] bg-cover bg-center h-[350px] rounded-[34px]">
      <div className='  mt-20 mx-10'>
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
        </div>

      </div>
      {/* <div className='font-Glitch sm:flex hidden text-white absolute mt-36'>
        <p className=' '>
          Step into the future of 
          <span className=' text-primary-pink-300' > PingPong</span>, 
        </p>
        <p> prepare for a
          <span className=' text-primary-pink-300 py-4'> thrilling </span>
          experience!
        </p>
      </div> */}
    </header>
    // <section className=' drop-shadow-[6px_5px_0_rgba(0,0,00.25)] relative mt-[200px] min-w-[500px] flex lg:max-w-[1400px] items-center' >
    //   <div className=' flex px-16 py-1 '>
    //     <img src="/girl.png"  alt='girl' className=' w-full rounded-[34px] shadow-xl' />
    //     <div className='absolute mx-14 my-24'>
    //       <h1 className=" drop-shadow-[6px_5px_0_rgba(0,0,00.25)] font-Glitch text-primary-white-100 text-base md:text-3xl lg:text-4xl xl:text-5xl">
    //         Welcome  to 
    //         <span className="font-extrabold text-primary-pink-300 "> *Somthing*.</span>
    //       </h1>
    //     </div>
    //   </div>
    // </section>
  )
}

export default DiscriptionCard

