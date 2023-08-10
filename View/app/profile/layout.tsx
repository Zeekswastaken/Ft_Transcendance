import ProfileSvgs from "@/components/tools/ProfileSvgs";
import Link from "next/link";
import React from "react";

interface Props {
  styles: string;
  title: string;
}

const ProfileTabs: React.FC<Props> = ({ title }) => {
  return (
    <div className=" text-white flex space-x-3 pb-4 hover:text-primary-pink-300 duration-300">
      <ProfileSvgs SvgName={title} />
      <p className=" pt-1 font-Heading text-2xl tracking-widest ">{title}</p>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-[url('/neon-background2.jpeg')] bg-cover bg-center bg-no-repeat  ">
      <div className=" mt-[200px] overflow-hidden mx-5 lg:mx-20">
        <div className=" grid grid-cols-1 2xl:grid-cols-3 mb-10">
          <div className=" h-auto 2xl:order-1 order-2 col-span-2  p-20">
            {children}
          </div>
          <div className="  order-1 flex place-content-center">
            <div className=" h-auto 2xl:h-[1000px] bg-[#321B38]/[0.7] shadow-2xl rounded-2xl w-[85%]">
              <div className=" b-5 2xl:mb-0 mt-[50px] grid place-content-center ">
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
                <div className=" bg-[#734475]/[0.5] drop-shadow-[6px_5px_0_rgba(0,0,00.35)] overflow-hidden whitespace-wrap mt-10 w-[75%] h-auto rounded-xl">
                  <div className=" px-14 py-4 cursor-pointer">
                    <Link href="/profile">
                      <ProfileTabs styles="" title="Overview" />
                    </Link>
                    <Link href="/profile/settings">
                      <ProfileTabs styles="" title="Settings" />
                    </Link>
                    <Link href="/profile/friends">
                      <ProfileTabs styles="" title="Friends" />
                    </Link>
                    <Link href="/profile/groups">
                      <ProfileTabs styles="" title="Groups" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
