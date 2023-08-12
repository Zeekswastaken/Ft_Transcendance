import Nav from "./tools/Nav";
import ProfileDropDown from "./tools/ProfileDropDown";
import NotificationDropDown from "./tools/NotificationDropDown";

const Navbar = () => {
	return (
		// Desktop Navigation
		// <div className=" ">
			<nav className=" hidden absolute place-content-center  items-center my-[55px] h-auto lg:flex w-[75%] justify-between space-x-5">
				<div className=" w-auto flex justify-between">
					<a href="/" className="flex">
						<p className=" font-Glitch text-pink-200 text-4xl text-justify pr-5 pt-1">Pong</p>
					</a>
					<form className=" pt-[7px]">
						<div className="relative ">
						<span className="absolute inset-y-0 left-2 flex items-center ">
							<button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
							<img src="/searchIcon.svg" width={20} height={20} alt="search" className=""/>
							</button>
						</span>
						<input type="search" name="q" className=" border-transparent focus:border-transparent focus:ring-0 w-[170px] py-2 text-sm text-[#6E4778] placeholder-[#6E4778] bg-[#411742]  rounded-xl pl-10 focus:outline-none focus:bg-primary-dark-500 focus:text-primary-white-200" placeholder="Search..." />
						</div>
					</form>
				</div>
				<div className=" bg-primary-dark-300 drop-shadow-[6px_5px_0_rgba(0,0,00.25)] opacity-80 rounded-3xl w-[340px]">
					<Nav />
				</div>
				<div className=" flex justify-between space-x-7">
					<div className=" z-50">
						<NotificationDropDown />
					</div>
					<div className=" z-50">
						<ProfileDropDown />
					</div>
				</div>  
			</nav>
		// </div>
		// Mobile navigation
	)
}

export default Navbar