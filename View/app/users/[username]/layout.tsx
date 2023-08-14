"use client";

import React, { useEffect } from "react";
// import UserCard from "./UserCard";
import { useParams, usePathname, useRouter } from "next/navigation";
import ProfileSvgs from "@/components/tools/ProfileSvgs";
import Link from "next/link";
import { get } from "http";
import { getCookie } from "cookies-next";
import { current } from "@reduxjs/toolkit";
import { is } from "immer/dist/internal";

// type User = {
// params: { username: string };
// };

interface Props {
  styles: string;
  title: string;
  link: string;
}

const ProfileTabs: React.FC<Props> = ({ title, link }) => {
  const pathname = usePathname();
  useEffect(() => {}, [pathname]);
  return (
    <>
      {pathname === link ? (
        <div className=" text-primary-pink-300 flex space-x-3 pb-4 duration-300">
          <ProfileSvgs SvgColor="#FF1382" SvgName={title} />
          <p className=" pt-1 font-Heading text-2xl tracking-widest ">
            {title}
          </p>
        </div>
      ) : (
        <div className=" text-white flex space-x-3 pb-4 hover:text-primary-pink-300 duration-300">
          <ProfileSvgs SvgColor="#fff" SvgName={title} />
          <p className=" pt-1 font-Heading text-2xl tracking-widest ">
            {title}
          </p>
        </div>
      )}
    </>
  );
};

interface ToggleTextButtonProps {
  initialText: string;
  newText: string;
  styles: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const User = useParams().username;

  const token = getCookie("accessToken");
  const isFriend = false;
  const isPrivate = false;
  const currentUsername = "Fouamep";
  const [isClicked, setIsClicked] = React.useState(true);

  const SetButtonText: React.FC<ToggleTextButtonProps> =  ( {initialText, newText, styles} ) => {
    const buttonText = isClicked ?  initialText : newText;
    return (
      <button
      onClick={handleAddFriend}
      className={styles}
    >
      {buttonText}
    </button>
    )
  } 

  const handleAddFriend = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className=" bg-[url('/neon-background2.jpeg')] bg-cover bg-center bg-no-repeat">
      <div className=" mt-[220px] mx-0 lg:mx-20">
        <div className=" grid grid-cols-1 2xl:grid-cols-3 mb-10">
          {isPrivate ? (
            <div className=" 2xl:order-1 order-2 col-span-2  p-20">
              <div className=" flex items-center place-content-center glass w-full h-[200px] 2xl:h-full">
                <h1 className=" text-3xl font-Heading text-white tracking-wider">
                  This account is Private
                </h1>
              </div>
            </div>
          ) : (
            <div className=" h-auto 2xl:order-1 order-2 col-span-2  p-20">
              {children}
            </div>
          )}
          <div className="  order-1 flex place-content-center">
            <div className="  bg-[#321B38]/[0.7] shadow-2xl rounded-2xl w-[85%]">
              <div className=" 2xl:mb-0 mt-[50px] grid place-content-center ">
                <img
                  src="/Spectate.png"
                  alt="avatar"
                  width={150}
                  height={150}
                  className=" border-4   border-primary-pink-300 rounded-full"
                />
                <div className=" text-center pt-4 space-y-2 font-Heading tracking-wider">
                  <p className=" text-3xl text-white">Fouamep</p>
                  {/* <p className=" text-xl tracking-widest text-[#D4D4D4]">
                    Fouad Bouanane
                  </p> */}
                </div>
              </div>
              <div className=" grid place-items-center">
                <div className="  bg-[#411941]/[0.8]  shadow-xl overflow-hidden whitespace-wrap mt-5 w-[75%] h-auto rounded-xl">
                  {/* max 180 character */}
                  <p className=" shadow-none text-white font-Heading text-xl leading-9 tracking-normal p-5 ">
                    Sed ut perspiciatis gdffs nbv adfgx bbfgg fg dhx s fggsgv b
                    sfbvn kfjv;fknv;klnbjb; nbkcmv/l n nklj; v
                    mjsdkfovppkz,cl'ds ddsds ds unde omnis iste natus error sit
                    .
                  </p>
                </div>
                {isPrivate ? (
                  <div className=" bg-[#411941]/[0.8]  shadow-xl overflow-hidden whitespace-wrap mt-10 w-[75%] rounded-xl mb-10">
                    <div className=" grid place-items-center items-center  h-[200px]">
                      <img
                        src="/eye.png"
                        width={50}
                        height={50}
                        alt="private"
                      />
                    </div>
                  </div>
                ) : (
                  <div className=" bg-[#411941]/[0.8]  shadow-xl mb-5 overflow-hidden whitespace-wrap mt-10 w-[75%] rounded-xl">
                    <div className=" px-14 pt-4 cursor-pointer">
                      <Link href={`/users/${User}`}>
                        <ProfileTabs
                          link={`/users/${User}`}
                          styles=""
                          title="Overview"
                        />
                      </Link>
                      {/* /* if current user is the same as the user in the url then show the settings tab */}
                      {currentUsername === User ? (
                        <Link href={`/users/${User}/settings`}>
                          <ProfileTabs
                            link={`/users/${User}/settings`}
                            styles=""
                            title="Settings"
                          />
                        </Link>
                      ) : (
                        ""
                      )}
                      <Link href={`/users/${User}/friends`}>
                        <ProfileTabs
                          link={`/users/${User}/friends`}
                          styles=""
                          title="Friends"
                        />
                      </Link>
                      <Link href={`/users/${User}/groups`}>
                        <ProfileTabs
                          link={`/users/${User}/groups`}
                          styles=""
                          title="Channels"
                        />
                      </Link>
                    </div>
                  </div>
                )}
                { currentUsername !== User && !isFriend ? (
                  <div className=" mt-20">
                   <SetButtonText styles=" text-white font-Bomb text-2xl px-5 pt-3 pb-2 rounded-2xl bg-[#6E4778] hover:text-gray-100 hover:bg-[#8d549c] shadow-inner duration-300" initialText="Add Friend" newText="Cancel Friend Request" />
                  </div>
                ) : ("")}
                { currentUsername !== User && isFriend ? (
                  <div className=" mt-20 flex space-x-5">
                    <SetButtonText styles="text-white font-Bomb text-xl px-5 pt-2 pb-1 rounded-2xl bg-[#6E4778] hover:text-gray-100 hover:bg-[#8d549c] shadow-inner duration-300 w-[135px]" initialText="Friends" newText="ADD Friend" />
                    <button className=" text-white font-Bomb text-xl px-5 pt-3 pb-2 rounded-2xl bg-[#AF0D63] hover:text-gray-100 hover:bg-[#cd237e] shadow-inner duration-300 w-[135px]">
                      Message
                    </button>
                  </div>
                ) : ("")}
              </div>
            </div>
          </div>
        </div>
        {/* <UserCard /> */}
      </div>
    </div>
  );
}
