import Nav from "./tools/Nav";
import ProfileDropDown from "./tools/ProfileDropDown";
import NotificationDropDown from "./tools/NotificationDropDown";

const Navbar = () => {
	return (
		// Desktop Navigation
		// <div className=" ">
			<nav className="  hidden  px-6 w-full absolute items-center justify-between sm:flex xl:max-w-[1400px]">
				<div className=" flex justify-center ml-5">
					<a href="/" className="flex">
						<p className=" font-Glitch text-pink-200 text-3xl text-justify pr-2 pt-1"> Pong</p>
						{/* <img src="/favicon.ico" width={50} height={50} alt="icon" className=" mx-4 ml-0"/> */}
					</a>
					<form className=" pt-[7px]">
						<div className="relative ">
						<span className="absolute inset-y-0 left-2 flex items-center ">
							<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
							<img src="/searchIcon.svg" width={20} height={20} alt="search" className=""/>
							</button>
						</span>
						<input type="search" name="q" className=" border-transparent focus:border-transparent focus:ring-0 w-[150px] py-2 text-sm text-[#6E4778] placeholder-[#6E4778] bg-[#411742]  rounded-xl pl-10 focus:outline-none focus:bg-primary-dark-500 focus:text-primary-white-200" placeholder="Search..." />
						</div>
					</form>
				</div>
				<div className="bg-primary-dark-300 drop-shadow-[6px_5px_0_rgba(0,0,00.25)] opacity-70 rounded-3xl my-[55px] mx-4  w-[400px] min-w-[150px] ">
					<Nav />
				</div>
				<div className=" flex justify-between space-x-7 mx-5">
					{/* <button type="button" title="notification">
						<Image src="/notification.svg" alt="notification" width={40} height={40}/>
					</button> */}
					<div className=" z-50">
						<NotificationDropDown />
					</div>
					<div className=" z-50">
						<ProfileDropDown />
					</div>
					{/* <button type="button" title="profile">
						<Image src="/avatars/avatar1.png" width={60} height={60} alt="Profile"/>
					</button> */}
				</div>  
			</nav>
		// </div>
		// Mobile navigation
	)
}

export default Navbar