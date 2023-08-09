"use client"
import React from 'react'

import FindGroup from './FindGroup';
import GroupButton from './component/Button';
import GroupFrom from './component/GroupForm';


const page = () => {

  const [group, setGroup] = React.useState(true);
  const handleClick = () => {
    setGroup(!group);
  };

  const groupsInfo = [
    {
      name : "Fringilla Fusce Elit",
      image: "https://placekitten.com/g/200/200",
      members: 20,
      type: "Protected"
    },
    {
      name : "Inceptos",
      image: "https://placekitten.com/g/200/200",
      members: 12,
      type: "Public"
    },
    {
      name : "Vestibulum",
      image: "https://placekitten.com/g/200/200",
      members: 3,
      type: "Protected"
    },
  ];

  interface GroupInfoStatesProps {
    name: string;
    image: string;
    members: number;
    type: string;
  }


  const addGroupsInfo = (groupInfo: GroupInfoStatesProps) =>
  {
    groupsInfo.push(groupInfo);
  }

  return (
    <div className=' text-3xl text-white mt-[400px] w-full mx-10 max-w-[1400px]'>
        <div className=' mb-[30px] w-full'>
          <div className='flex justify-between'> 
              <div className='flex'>
                <div className='mr-5'>
                  <GroupButton name='Find Group' bt_state={group} onClick={handleClick}></GroupButton>
                </div>
                  <GroupButton name='Creact Group' bt_state={!group} onClick={handleClick}></GroupButton>
              </div>
              <div>
                {group ? <GroupFrom /> : <div></div>}
              </div>
          </div>
        </div>

        {group ?  <FindGroup groupsInfos={groupsInfo}/> : <div></div>}
    </div>
  )
}

export default page