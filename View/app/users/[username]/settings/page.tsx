import React from "react";

interface Props {
  label: string;
  exContent: string;
  type: string;
}

const Inputs: React.FC<Props> = ({ label, exContent, type }) => {
  let inputType;
  if (type === "select") {
    inputType = <select defaultValue={exContent}  name="Privacy" autoComplete="off" className="shadow-base fonct-Heading tracking-wider bg-[#562257] sm:text-sm  rounded-2xl placeholder:text-[#B1B1B1] placeholder:font-bold placeholder:text-base w-full h-[50px] ">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>;
  }
  else {
    inputType = <input type={type} name={type} autoComplete="off" className=" fonct-Heading tracking-wider bg-[#562257] w-full h-[50px] sm:text-sm  rounded-2xl placeholder:text-[#B1B1B1] placeholder:font-bold placeholder:text-base" placeholder={exContent} />;}
  return (
    <div>
      <label
        htmlFor={label}
        className=" text-xl tracking-wide font-Heading text-[#D4D4D4] "
      >
        {label}
      </label>
      <div className="mt-1">
        {inputType}
      </div>
    </div>
  );
};

const Settings = () => {
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
              <div className=" 2xl:pt-20 pt-5 px-10 w-full">
                <div className="  flex place-content-center mt-4">
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
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-[#D4D4D4]"
                  >
                    Bio
                  </label>
                  <div className="mt-2">
                    <textarea
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
                {/* <Inputs label="Full Name" exContent="Fouad Bouanane" type="text" /> */}
                <Inputs label="Username" exContent="Fouamep" type="text" />
                <Inputs label="Privacy" exContent="Public" type="select" />
                <Inputs label="Password" exContent="" type="password" />
                <Inputs label="Re-Password" exContent="" type="password" />
              </div>
              <div className=" flex space-x-5 my-5 place-content-center">
                  <button className=" text-white font-Heading text-xl tracking-wide hover:text-primary-pink-300 duration-300">Cancel</button>
                  <div className=" border-2 rounded-xl hover:bg-primary-pink-300 duration-300  border-primary-pink-300 ">
                    <button className=" py-1 px-2 text-white font-Heading text-xl tracking-wide duration-300">Apply</button>
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
