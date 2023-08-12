'use client';

import React, { useState } from 'react'
import Image from "next/image";


const SendButton = () => {
  return (
  <div>
    <button type="submit">
      <Image src="/send.png" width={40} height={40} alt="icon" className="absolute mx-4 right-2 bottom-2" />
    </button>
  </div>
  );
};

export default SendButton;