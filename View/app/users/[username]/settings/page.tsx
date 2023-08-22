"use client"
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import React, { FormEvent, MouseEvent, MouseEventHandler, use, useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";


interface Props {
  label: string;
  exContent: string;
  type: string;
}


const Settings = () => {
  
  
  const [user, setUser] = useState<JwtPayload>()
  const router = useRouter();
  const token = getCookie("accessToken");
  useEffect(() => {
    try {
      const user = jwt.decode(token as string) as JwtPayload
      if (user)
      setUser(user)
    // setCurrentUsername(jwt.decode(token).username);
  } catch (error) {
    console.error('Error decoding token:');
  }
}, [])

  const handleApply = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/profile/update/${user?.id}`, {
      privacy: privacy,
      username: username,
      password: password,
      Bio: bio
    }).then(res => {
      if (res.data.message === "error") {
        console.log(res)
        return ;
      }
      else {
        console.log("token = ", res.data.token)
        setCookie("accessToken", res.data.token);
        // useEffect(() => {
            try {
              const user = jwt.decode(res.data.token as string) as JwtPayload
              if (user)
                setUser(user);
              router.push(`/users/${user?.username}`);
          } catch (error) {
            console.error('Error decoding token:');
          }
        // }, [])
        
      }
    }).catch(res => {console.log(res)});
  }
  
  const [privacy, setPrivacy] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  return (
    <div className=" border-2 mt-10 border-primary-pink-300 rounded-[20px]">
      <div className=" glass w-full h-auto ">
        <div className=" flex place-content-center">
          <div className="  w-[78%] h-auto pb-20">
            <div className=" overflow-hidden whitespace-wrap">
              <h1 className=" pt-12 text-white font-Bomb text-4xl">
                Account Settings
              </h1>
            </div>
            <div className="bg-[#2F0331] w-full grid grid-cols-1  2xl:grid-cols-3 mt-3 rounded-2xl opacity-90 border border-primary-pink-300">
              <div className=" 2xl:pt-16 pt-5 px-10 w-full">
                <div className="  flex place-content-center mt-0">
                  <label
                    htmlFor="uploadImage"
                    className="cursor-pointer flex relative place-content-center"
                  >
                    <img
                      src="/profileEx.png"
                      alt="profile"
                      width={130}
                      height={130}
                    />
                    <img
                      className=" absolute mt-[58px]"
                      src="/camera.svg"
                      alt="icon"
                      width={25}
                      height={20}
                    />
                  </label>
                  <input
                    className="hidden"
                    id="uploadImage"
                    accept="image/*"
                    type="file"
                    name="avatar"
                  />
                </div>
                <div className=" mt-5 w-full">
                  <div className="mt-4">
                    <label
                        htmlFor="Bio"
                        className=" text-xl tracking-wide font-Heading text-[#D4D4D4] "
                      >
                        Bio
                    </label>
                    <textarea
                      onChange={e => setBio(e.target.value)}
                      value={bio}
                      rows={3}
                      name="comment"
                      id="comment"
                      className="shadow-sm no-scrollbar font-bold resize-none text-[#D4D4D4] block w-full sm:text-sm bg-[#562257] rounded-md"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
              <div className="  p-12 grid col-span-2 space-y-4">
                {/* <Inputs label="Username" exContent="Fouamep" type="text" /> */}
                <div>
                  <label
                      htmlFor="Username"
                      className=" text-xl tracking-wide font-Heading text-[#D4D4D4] "
                    >
                      Username
                  </label>
                  <div className=" mt-1">
                    <input onChange={e => setUserName(e.target.value)} value={username} type="text" name="text" autoComplete="off" className=" fonct-Heading tracking-wider bg-[#562257] w-full h-[50px] sm:text-sm  rounded-2xl placeholder:text-[#B1B1B1] placeholder:font-bold placeholder:text-base" placeholder="Fouamep" />
                  </div>
                </div>

                <div>
                  <label
                      htmlFor="Privacy"
                      className=" text-xl tracking-wide font-Heading text-[#D4D4D4] "
                    >
                      Privacy
                  </label>
                  <div className=" mt-1">
                    <select onChange={e => setPrivacy(e.target.value)}  defaultValue="Public"  name="Privacy" autoComplete="off" className="shadow-base fonct-Heading tracking-wider bg-[#562257] sm:text-sm  rounded-2xl placeholder:text-[#B1B1B1] placeholder:font-bold placeholder:text-base w-full h-[50px] ">
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="Password"
                    className=" text-xl tracking-wide font-Heading text-[#D4D4D4] "
                    >
                      Password
                  </label>
                  <div className=" mt-1">
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" autoComplete="off" className=" fonct-Heading tracking-wider bg-[#562257] w-full h-[50px] sm:text-sm  rounded-2xl placeholder:text-[#B1B1B1] placeholder:font-bold placeholder:text-base" />
                  </div>
                </div>
              </div>
              <div className=" flex space-x-5 my-5 place-content-center">
                  <button className=" text-white font-Heading text-xl tracking-wide hover:text-primary-pink-300 duration-300">Cancel</button>
                  <div className=" border-2 rounded-xl hover:bg-primary-pink-300 duration-300  border-primary-pink-300 ">
                    <button onClick={handleApply} className=" py-1 px-2 text-white font-Heading text-xl tracking-wide duration-300">Apply</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
