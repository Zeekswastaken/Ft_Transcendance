"use client"

import { useState, Fragment, ReactNode } from "react";
import ModalContent from "../tools/Modal";
import { Dialog, Transition } from '@headlessui/react'

type Cards = {
  title: string
  description: string
  buttonText: string
  image: string
  span: string
}

const Card = ( {title, description, buttonText, image, span} : Cards ) => {
  

  const targetWord = span;
  const index = description.indexOf(targetWord);
  const firstPart = description.slice(0, index);
  const secondPart = description.slice(index + targetWord.length);
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {setIsOpen(false)}
  function openModal() {setIsOpen(true)}

  return (
    <div className="group card_shape">
      <div className="h-96 ">
        <img className=" card_image" src={image} alt="" />
      </div>
      <div className=" card_handle_hover">
        <h1 className=" card_text_h">{title}</h1>
        <p className=" card_text_p font-Heading">
        {firstPart}
        <span className=" underline text-primary-pink-300">{targetWord}</span>
        {secondPart}
        </p>
          <div onClick={openModal} className=" card_button">
              <button  className=" card_button_text ">{buttonText}</button>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-50" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-3xl transform  rounded-2xl bg-[#A1216C] p-6 text-center align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-Bomb leading-6 text-white tracking-wider"
                      >
                        {title}
                      </Dialog.Title>
                      
                      
                      
                      <div className=" grid place-items-center">
                        <div className="">
                          <ModalContent title={title}/>
                        </div>
                      </div>
                      <div className="mt-4">
                      
                      
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Invite!
                      </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
      </div>
    </div>
  )
}

const GameCards = () => {
  return (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[1400px] mt-20 px-10  justify-center">
    <Card title="One Vs One" description="Compete head-to-head against friends and rivals in thrilling ping pong matches." buttonText="Play Now" image="/OneVsOne.png" span="head-to-head"/>
    <Card title="One Vs Bot" description="Challenge yourself against an advanced AI opponent  in intense solo ping pong battles." buttonText="Play Now" image="/OneVsBot.png" span="AI opponent" />
    <Card title="Spectate" description="Spectate live streams of exciting ping pong matches for an immersive viewing experience." buttonText="Watch Stream" image="/Spectate.png" span="live streams"/>
  </div>
  )
}

export default GameCards