import ProfileSvgs from "@/components/tools/ProfileSvgs";
import React from "react";

interface Props {
  styles: string;
  title: string;
}

const ProfileCards: React.FC<Props> = ({ styles, title }) => {
  return (
    <div
      className={` glass h-[350px] whitespace-wrap overflow-hidden ${styles}`}
    >
      <p className=" p-6 font-Bomb text-3xl text-white">{title}</p>
    </div>
  );
};


const Profile = () => {
  return (
    <div className=" grid grid-rows-2 gap-y-10">
      <div className=" grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-x-6">
        <ProfileCards title="Level Reached" styles="" />
        <ProfileCards title="Win Rate" styles="xl:col-span-2" />
      </div>
      <div className=" grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-x-6">
        <ProfileCards title="Match History" styles="" />
        <ProfileCards title="Achievments" styles="xl:col-span-2" />
      </div>
    </div>
  );
};

export default Profile;
