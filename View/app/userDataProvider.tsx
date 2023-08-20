"use client"

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { JsxEmit } from "typescript";

type userData = {
  id:number
  username: string
  Bio: string
  avatar_url: string
  birthDay:string
  gender:string
  privacy:boolean
  stats:{
    matches_played:number
    losses:number
    wins:number
    winrate:number
  }
}


// Create the context with the appropriate type
const userDataContext = createContext<userData | undefined>(undefined);

// Define the hook to consume the userData context
export function useUserDataContext(): userData | undefined {
  return useContext(userDataContext);
}

// Define the userDataProvider component
interface userDataProviderProps {
  children: React.ReactNode;
}


export function UserDataProvider({ children }: userDataProviderProps) {
  const User = useParams().username;
  const router = useRouter();
  const [userData, setUserData] = useState<userData>({} as userData)
  useEffect(() => {
    axios.get(`http://10.14.3.9:3000/profile/${User}`).then((res) =>{
      if(!res.data)
        return
      setUserData(res.data);
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
    })
    
  }, [User])


  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
}