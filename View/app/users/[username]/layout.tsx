"use client";

import React, { useEffect } from "react";
// import UserCard from "./UserCard";
import { useParams, usePathname, useRouter } from "next/navigation";
import ProfileSvgs from "@/components/tools/ProfileSvgs";
import Link from "next/link";
import { get } from "http";
import { getCookie } from "cookies-next";

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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const User = useParams();

  const token = getCookie("accessToken");
  
  return (
    <div className=" bg-[url('/neon-background2.jpeg')] bg-cover bg-center bg-no-repeat">
      <div className=" mt-[300px]  mx-5 lg:mx-20">
        <div className=" grid  grid-cols-1 2xl:grid-cols-3 mb-10">
          <div className=" h-auto 2xl:order-1 order-2 col-span-2  p-20">
            {children}
          </div>
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
                    sfbvn kfjv;fknv;klnbjb; nbkcmv/l n nklj; v
                    mjsdkfovppkz,cl'ds ddsds ds unde omnis iste natus error sit
                    .
                  </p>
                </div>
                <div className=" bg-[#734475]/[0.5] drop-shadow-[6px_5px_0_rgba(0,0,00.35)] overflow-hidden whitespace-wrap mt-10 w-[75%]  rounded-xl">
                  <div className=" px-14 pt-4 cursor-pointer">
                    <Link href={`/users/${User.username}`}>
                      <ProfileTabs link={`/users/${User.username}`} styles="" title="Overview" />
                    </Link>
                    <Link href={`/users/${User.username}/settings`}>
                      <ProfileTabs
                        link={`/users/${User.username}/settings`}
                        styles=""
                        title="Settings"
                      />
                    </Link>
                    <Link href={`/users/${User.username}/friends`}>
                      <ProfileTabs
                        link={`/users/${User.username}/friends`}
                        styles=""
                        title="Friends"
                      />
                    </Link>
                    <Link href={`/users/${User.username}/groups`}>
                      <ProfileTabs
                        link={`/users/${User.username}/groups`}
                        styles=""
                        title="Groups"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <UserCard /> */}
        </div>
      </div>
    </div>
  );
}
