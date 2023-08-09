import GroupInfos from "./component/GroupInfo";


interface GroupInfoStatesProps {
    name: string;
    image: string;
    members: number;
    type: string;
}

  interface GroupInfosStatesProps
  {
    groupsInfos: GroupInfoStatesProps[]
  }

const FindGroup = ({groupsInfos}: GroupInfosStatesProps) => {
    return (
        <div className='rounded-xl h-[800px] bg-[#A1216C] px-[3rem] pt-[3rem] mb-[100px] overflow-auto'>               
            <div>
                {
                    groupsInfos.map((group) => (
                        <GroupInfos name={group.name} 
                                    image={group.image} 
                                    members={group.members} 
                                    type={group.type}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default FindGroup;