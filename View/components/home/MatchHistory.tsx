"use client"

// import Row from "../tools/Row";

type TableDataRow = {
	opponent: string
	score: string
	date: string
	result: string
	avatar: string
};

type TableDataFreind = {
	avatar: string
	name: string
	state: string
}

const Row = ( {opponent, score, date, result, avatar} : TableDataRow ) => {

	const WinOrLost = result === "win" ? "bg-[#4ADE80]/[0.4]" : "bg-[#FF7171]/[0.4]";
	const WinOrLost_hover = result === "win" ? "hover:bg-[#4ADE80]" : "hover:bg-[#FF7171]";
	
	return (
		<tr className={ `${WinOrLost} ${WinOrLost_hover} transition-all duration-700`} >
			<td className="p-3">
				<div className="flex align-items-center ">
					<img className="rounded-full h-12 w-12  object-cover " src={avatar} alt="avatar" />
					<div className=" ml-3 mt-3 font-Heading tracking-wider ">{opponent}</div>
				</div>
			</td>
			<td className="px-5 text-2xl">{score}</td>
			<td className="p-3 rounded-r-[.625rem]">{date}</td>
		</tr>
	)
}

const Friend = ( { avatar, name, state} : TableDataFreind ) => {

	const onOrOffColor = state === "online" ? "text-[#22C55E]" : "text-[#FF4747]";
	return (
		<ul className=" hover:bg-primary-pink-200/[0.6] transition-all duration-500 hover:rounded-3xl hover:drop-shadow-2xl pt-4 lg:pt-6  divide-y divide-gray-200 dark:divide-gray-700 tracking-widest text-[24px] text-white font-Headinglight">
			<li className="pb-3 sm:pb-4 mx-10 ">
				<div className="flex items-center space-x-6">
					<div className="flex-shrink-0">
						<img className="w-14 h-14 rounded-full" src={avatar} alt="avatar"/>
					</div>
					<div className=" dropdown flex-1 min-w-0">
						<p tabIndex={0} className=" hover:text-pink-300 duration-300 cursor-pointer truncate ">{name}</p>
						<ul tabIndex={0} className=" text-black dropdown-content z-50 menu p-2 shadow bg-purple-300 rounded-box w-40">
							<li><a>Item</a></li>
							<li><a>Item</a></li>
						</ul>
					</div>
					<div className= {`inline-flex items-center tracking-wider text-lg ${onOrOffColor}`}>
						{state}
					</div>
				</div>
			</li>
		</ul>
	)
}

const MatchHistory = () => {
	return (
		
		<div className="  my-16 mx-20 grid grid-cols-1 lg:grid-cols-2 lg:max-w-[1400px] ">
			<div className=" glass  relative text-white px-8 pb-6 pt-3 w-full overflow-auto max-h-[522px]">
				<table className="table w-full text-sm text-left border-separate space-y-10">
					<thead className="  text-2xl uppercase font-Bomb">
						<tr className=" text-white/90">
							<th className="p-3">opponent</th>
							<th className="p-3">score</th>
							<th className="p-3">date</th>
						</tr>
					</thead>
					<tbody className=" font-bold text-xl">
						<Row opponent="Hawkins" score="2-5" date="May 30, 2023" result="lost" avatar="/avatars/avatar1.png" />
						<Row opponent="Gloria" score="5-2" date="May 30, 2023" result="win" avatar="/avatars/avatar2.png" />
						<Row opponent="Colleen" score="6-3" date="May 30, 2023" result="win" avatar="/avatars/avatar3.png" />
						<Row opponent="Karim" score="2-5" date="May 30, 2023" result="lost" avatar="/avatars/avatar4.png" />
						<Row opponent="Samir" score="6-3" date="May 30, 2023" result="win" avatar="/avatars/avatar5.png" />
					</tbody>
				</table>
			</div>
			<div className=" glass no-scrollbar mt-10 lg:mt-0 lg:ml-[100px] overflow-auto max-h-[522px] ">
				< Friend avatar="/avatars/avatar1.png" name="Hawkins" state="online"/>
				< Friend avatar="/avatars/avatar2.png" name="Sofia" state="offline"/>
				< Friend avatar="/avatars/avatar3.png" name="Samia" state="online"/>
				< Friend avatar="/avatars/avatar4.png" name="Khalid" state="offline"/>
				< Friend avatar="/avatars/avatar5.png" name="Mounir" state="online"/>
				< Friend avatar="/avatars/avatar1.png" name="Barak" state="offline"/>
				< Friend avatar="/avatars/avatar2.png" name="Wasafi" state="offline"/>
				< Friend avatar="/avatars/avatar3.png" name="Criminal" state="offline"/>
			</div>
		</div>
		)
}

export  default {MatchHistory, Row}


