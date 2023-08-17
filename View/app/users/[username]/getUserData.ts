import axios from "axios";


export function getUserData(User:String) {
    axios.get(`http://localhost:3000/profile/${User}`).then((res) =>{
        console.log(res.data)
        return res
        }).catch((err) => {
            console.log(err);
        })
}

