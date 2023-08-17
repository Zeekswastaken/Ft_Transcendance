import reaact from "react"

type profileProps = 
{
    name:string;
    img:string;
    href:string;
    alt:string;
    online:boolean;
}

const profile = (props: profileProps) =>
{
    return (
        <li className=" items-center space-y-1">
        <div className=' relative bg-[#321B38] p-1 rounded-full'>

        <a className="block  w-16 h-16  rounded-full " href={props.href}>
          <img className="h-16 w-16 rounded-full" src={props.img} alt={props.alt} />
        </a>
        <div className={`absolute bottom-0 right-0 rounded-full ${props.online ? "bg-green-500" : "bg-gray-500"} border-2 border-white w-[20px] h-[20px]`}></div>
        </div>
        {/* <a href={props.href}>{props.name}</a> */}
      </li>
    );
}

export default profile