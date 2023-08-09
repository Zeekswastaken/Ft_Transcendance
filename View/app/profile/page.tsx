import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Profile = () => {
  return (
    <div className=" mt-[200px] overflow-hidden mx-5 lg:mx-20">
      <div className=" grid grid-cols-1 xl:grid-cols-3 mb-10">
        <div className=" h-auto xl:order-1 order-2 col-span-2  p-20">
          <div className=" grid grid-rows-2 gap-y-10">
            <div className=" grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-x-6">
              <div className=" glass h-[350px] whitespace-wrap overflow-hidden">
                <p className=" p-6 font-Bomb text-3xl text-white">
                  Level Reached
                </p>
              </div>
              <div className=" glass h-[350px] xl:col-span-2 whitespace-wrap overflow-hidden">
                <p className=" p-6 font-Bomb text-3xl text-white">Win Rate</p>
              </div>
            </div>
            <div className=" grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-x-6">
              <div className=" glass h-[350px] whitespace-wrap overflow-hidden">
                <p className=" p-6 font-Bomb text-3xl text-white">
                  Match History
                </p>
              </div>
              <div className=" glass h-[350px] xl:col-span-2 flex whitespace-wrap overflow-hidden">
                <p className=" p-6 font-Bomb text-3xl text-white">
                  Achievments
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-auto order-1 flex place-content-center">
          <div className=" bg-[#321B38]/[0.7] shadow-2xl rounded-2xl w-[85%]">
            <div className=" mt-[50px] grid place-content-center ">
              <img
                src="/Spectate.png"
                alt="avatar"
                width={150}
                height={150}
                className=" border-4   border-primary-pink-300 rounded-full"
              />
              <div className=" text-center pt-4 space-y-2 font-Heading tracking-wider">
                <p className=" text-3xl text-white">Fouamep</p>
                <p className=" text-xl tracking-widest text-[#D4D4D4]">
                  Fouad Bouanane
                </p>
              </div>
            </div>
            <div className=" grid place-items-center">
              <div className="  bg-[#734475]/[0.5] drop-shadow-[6px_5px_0_rgba(0,0,00.35)] overflow-hidden whitespace-wrap mt-5 w-[75%] h-auto rounded-xl">
                {/* max 180 character */}
                <p className="  drop-shadow-none text-white font-Heading text-xl leading-9 tracking-normal p-5 ">
                  Sed ut perspiciatis gdffs nbv adfgx bbfgg fg dhx s fggsgv b
                  sfbvn kfjv;fknv;klnbjb; nbkcmv/l n nklj; v mjsdkfovppkz,cl'ds
                  ddsds ds unde omnis iste natus error sit .
                </p>
              </div>
              <div className=" bg-[#734475]/[0.5] drop-shadow-[6px_5px_0_rgba(0,0,00.35)] overflow-hidden whitespace-wrap mt-5 w-[75%] h-auto rounded-xl">
                <div className=" p-14">
                  <div className=" text-white flex space-x-3 hover:text-primary-pink-300 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M31.668 17.619V29.9999C31.668 31.8409 30.1756 33.3333 28.3346 33.3333H10.0013C8.16035 33.3333 6.66797 31.8409 6.66797 29.9999V11.6666C6.66797 9.82564 8.16035 8.33325 10.0013 8.33325H22.3823" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M29.9987 11.6666C30.9192 11.6666 31.6654 10.9204 31.6654 9.99992C31.6654 9.07944 30.9192 8.33325 29.9987 8.33325C29.0782 8.33325 28.332 9.07944 28.332 9.99992C28.332 10.9204 29.0782 11.6666 29.9987 11.6666Z" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                      <path d="M13.332 25L18.332 18.3333L21.6667 21.6667L26.6654 15" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p className=" pt-1 font-Heading text-2xl tracking-widest ">
                      Overview
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
