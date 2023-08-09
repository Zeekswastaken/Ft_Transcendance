"use client"
import { useState } from 'react'
import { Tab, Menu } from '@headlessui/react'
import { idText } from 'typescript'

function classNames(...classes : any) {
  return classes.filter(Boolean).join(' ')
}

const  NotificationDropDown = () => {
  let [categories] = useState({
    Invites: [
      {
        id: 1,
        title: 'Mark Invites you to One Vs One game',
        date: '5h ago',
        isInvite: 1,
    },
    {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        isInvite: 1,
    },
],
"Friend Request": [
    {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        isInvite: 0,
    },
    {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        isInvite: 0,
      },


    ],
  })

  return (
	<Menu as="div" className=" mt-3">
        <div>
          <Menu.Button>
		  <img src="/notification.svg" alt="notification" width={40} height={40}/>
          </Menu.Button>
        </div>
          <Menu.Items className=" absolute right-20 mt-2 mr-2 xl:mr-0 w-30  divide-y-1 tracking-wide divide-gray-300 rounded-md  shadow-3xl  ">
			<div className=''>
				<Tab.Group>
						<Tab.List className="flex space-x-1 rounded-xl bg-primary-purple-800 p-1">
						{Object.keys(categories).map((category) => (
							<Tab
							key={category}
							className={({ selected }) =>
								classNames(
								'w-full rounded-lg py-2.5 text-sm font-Bomb tracking-widest leading-5 ',
								selected
									? 'bg-[#411742] text-white shadow'
									: 'text-white hover:bg-white/[0.12] hover:text-white duration-300'
								)
							}
							>
							{category}
							</Tab>
						))}
						</Tab.List>
						<Tab.Panels className="mt-2">
						{Object.values(categories).map((posts, idx) => (
							<Tab.Panel
							key={idx}
							className={classNames(
								'rounded-xl bg-[#411742] drop-shadow-[6px_5px_0_rgba(0,0,00.25)] p-3',
								' font-bold'
							)}
							>
							<ul className=' max-h-96 overflow-auto  text-[#EFEFEF]'>
								{posts.map((post) => (
								<li
									key={post.id}
									className="relative rounded-md p-3 hover:bg-primary-purple-800/[0.8] duration-300"
								>
                    <div className=' space-x-4 flex justify-between'>
                        <h3 className="text-sm  leading-5">
                        {post.title}
                        </h3>
                        { post.isInvite === 1 ? (
                            <div className=' rounded-[20px] bg-primary-pink-300/80 hover:bg-primary-pink-300/60 capitalize shadow hover:duration-300 shadow-black/60 '>
                                <a href='/game' className=" card_button_text ">join</a>
                            </div>

                        ) : (
                            ""
                        )

                        }
                    </div>
									<ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-200">
									<li>{post.date}</li>
									</ul>

								</li>
								))}
							</ul>
							</Tab.Panel>
						))}
						</Tab.Panels>
					</Tab.Group>
			</div>
          </Menu.Items>
      </Menu>
  )
}

export default NotificationDropDown


