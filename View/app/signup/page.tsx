"use client"
import React, { useEffect } from "react"

const signup = () => {
  const handleSubmit = () => {
    console.log("Submited");
  }
  return (
    <div className="grid place-items-center h-screen ">
      <div className=" bg-[#1B071C]/[0.8] min-w-[300px] overflow-auto h-[600px] w-[500px] mt-[140px] rounded-2xl border-[#D16ACE] border">
      <form action="/signup/complete-profile" className=" text-center grid  place-content-center  font-semibold">
        <div className=" text-white text-center grid place-content-center  ">
          <div className="font-Glitch">
            <p className=" text-[45px] pt-6">Get in the Game</p>
          </div> 
            <div className="space-x-11 flex place-content-center mt-4">
              <a href="/" className=" shadow-2xl bg-[#472B4E] hover:bg-[#472B4E]/[0.8] transition-all duration-300 p-2 flex space-x-2 rounded-2xl hover:text-gray-100">
                <img className="" src="/42.svg" alt="42" width={20} height={20} />
                <p>Network</p>
              </a>
              <a href="/" className=" shadow-2xl bg-[#A1216C] hover:bg-[#A1216C]/[0.8] transition-all duration-300 p-2 flex space-x-2 rounded-2xl hover:text-gray-100">
                <img src="/google.svg" alt="google" width={20} height={20} />
                <p>Google</p>
              </a>
            </div>
            <div className=" pt-3 divider">or</div>
            <input type="text" placeholder="Username" className="bg-[#1C0D16] px-6 border-transparent focus:border-transparent focus:ring-0 focus:outline-primary-pink-300  placeholder:text-[#837F7F] p-4 mt-4 sm:mx-0 mx-5 rounded-xl "/>
            <input type="text" placeholder="Your Email" className="bg-[#1C0D16] px-6 border-transparent focus:border-transparent focus:ring-0 focus:outline-primary-pink-300  placeholder:text-[#837F7F] p-4 mt-2 sm:mx-0 mx-20 rounded-xl"/>
            <input type="password" placeholder="Password" className="bg-[#1C0D16] px-6 border-transparent focus:border-transparent focus:ring-0 focus:outline-primary-pink-300  placeholder:text-[#837F7F] p-4 mt-2 sm:mx-0 mx-20 rounded-xl "/>
            <input type="password" placeholder="Re-Password" className="bg-[#1C0D16] px-6 border-transparent focus:border-transparent focus:ring-0 focus:outline-primary-pink-300  placeholder:text-[#837F7F] p-4 mt-2 sm:mx-0 mx-20 rounded-xl"/>
            <a href="#" className=" hover:underline pt-2 text-[#EBA3EA] text-end font-normal text-sm">Forgot  Password?</a>
            <button className= " bg-primary-pink-300 hover:bg-primary-pink-300/[0.8] transition duration-300 hover:border font-Bomb mx-20 mt-3 p-2 rounded-2xl text-center text-xl">
              sign up
            </button>
            <p className=" font-normal text-xs mt-2">Already have an account? <a className=" hover:underline text-[#EBA3EA]" href="/login">Log In</a></p>
        </div>
      </form>
      </div>

    </div>
)
}
export default signup