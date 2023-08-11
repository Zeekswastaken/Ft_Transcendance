import reaact from "react"
import Profile from './profile';
import FriendBar from './friendBar';

function chatList() 
{
    return (
    <div className=" relative w-[400px]  max-lg:[300px] h-[90%] p-1 m-4 bg-[#321B38] rounded-2xl"> {/* friends*/}
      <div>
        <ul className='flex flex-row overflow-x-auto whitespace-no-wrap space-x-4 scrollbar-hide'>
            <Profile  name="elipsse" img="/OneVsBot.png" href="#" alt="test" online={true} />
            <Profile  name="elipsse" img="/OneVsBot.png" href="#" alt="test" online={true} />
            <Profile  name="elipsse" img="/Ellipse-3.png" href="#" alt="test" online={false} />
            <Profile  name="elipsse" img="/Ellipse.png" href="#" alt="test" online={true} />
            <Profile  name="elipsse" img="/OneVsBot.png" href="#" alt="test" online={false} />
            <Profile  name="elipsse" img="/OneVsBot.png" href="#" alt="test" online={false} />
            <Profile  name="elipsse" img="/OneVsBot.png" href="#" alt="test" online={true} />
            <Profile  name="elipsse" img="/OneVsBot.png" href="#" alt="test" online={false} />
        </ul>
      </div>
      <div className="relative w-full h-[93%] mt-2">
        <div className=" w-full h-full overflow-y-scroll scrollbar-hide rounded-2xl">
          <ul className=" flex flex-col  whitespace-no-wrap space-y-2">
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
            <FriendBar />
          </ul>
        </div>
      </div>
    </div>);
}

export default chatList;