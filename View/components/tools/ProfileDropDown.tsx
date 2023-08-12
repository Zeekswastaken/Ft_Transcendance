"use client"

import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { FormEvent, Fragment } from 'react'

const ProfileDropDown = () => {

  const router = useRouter();
  const currentUsername = "Fouamep";
  const profilePage = `/users/${currentUsername}`;
  const pushProfilePage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(profilePage);
  }

  return (
    // <div className="">
      <Menu as="div">
        <div>
          <Menu.Button>
            <img src="/Spectate.png" className=' rounded-full' width={60} height={60} alt="Profile"/>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className=" text-[#EAEAEA] absolute right-0 mt-1 mr-2 xl:mr-0 w-30 origin-top-right divide-y-1 tracking-wide divide-gray-300 rounded-md bg-[#411742] shadow-3xl  ">
            <div className="px-1 py-2">
            <Menu.Item>
                {({ active }) => (
                <div
                    className={`${
                    active ? '' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                    <div>
                        <div className='font-Bomb'>Fouad Bouanane</div>
                        <div className=' font-Heading tracking-widest'>Fouamep</div>
                    </div>
                </div>
                )}
            </Menu.Item>
            </div>
            <div className="px-1 py-1 items-center font-bold">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={pushProfilePage}
                    className={`${
                      active ? 'bg-[#be67d2] duration-300' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    My Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={`${
                      active ? 'bg-[#be67d2] duration-300' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Something
                  </a>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-2 font-semibold">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href='#'
                    className={`${
                      active ? 'bg-[#FF7171]/[0.7]  duration-300 ' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Sign Out
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    // </div>
  )
}

export default ProfileDropDown;
