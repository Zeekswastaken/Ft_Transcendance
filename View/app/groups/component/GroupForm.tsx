import React from 'react'

const GroupFrom = () => {
    return (
        <div>
            <form>
                <div className="relative">
                    <span className="absolute inset-y-0 left-2 flex items-center">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline ">
                        <img src="/searchIcon.svg" width={20} height={20} alt="search" className=""/>
                    </button>
                    </span>
                    <input type="search" name="q" className=" border-transparent focus:border-transparent focus:ring-0 w-[250px] h-[50px] py-2  text-sm text-[#6E4778] placeholder-[#6E4778] bg-[#411742]  rounded-xl pl-10 focus:outline-none focus:bg-primary-dark-500 focus:text-primary-white-200" placeholder="Search..." />
                </div>
            </form>
        </div> 
    );
}

export default GroupFrom;