import { useEffect, useState } from "react";
import { Button } from "../components/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { receiverNameState, receiverState } from "../store/atoms";
import { useSetRecoilState } from "recoil";

export const Users = () => {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`http://127.0.0.1:3000/api/v1/user/bulk?filter=${filter}`,{
                headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("token"),
                    'Content-Type' : 'application/json'
                }
            })
            

            setUsers(response.data.users);

        }
        fetchUsers();

    },[filter])

    

    return (
        <>
         <div className="font-bold ml-6 text-lg">
            USERS
         </div> 
         <div className="mx-6 my-2 ">
            <input type="text" placeholder="Searchn users......." onChange={(e) => setFilter(e.target.value)} className="w-full pl-2 border rounded py-1"/>
         </div>
         <div>
            {users.map((user) => <User user={user} index={user._id}/>)}
         </div>
        </>
    )
}


function User({user,index}) {
    const setReceiver = useSetRecoilState(receiverState);
    const setReceiverName = useSetRecoilState(receiverNameState);
    const navigate = useNavigate();
    const handle = () => {
        setReceiver(user._id);
        setReceiverName(user.firstName);

        navigate("/send");
    }

    return <div key={index} className="flex justify-between mx-6 my-2 border rounded items-center px-2 py-1">
        <div className="flex gap-4 font-semibold">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1">
                 <div className="flex flex-col justify-center h-full text-xl font-bold">
                    {user.firstName[0].toUpperCase()}
                 </div> 
            </div>     
            <div className="flex justify-between items-center">
                
                    {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
                 
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <button className="text-white border-black px-4 rounded py-1 bg-slate-800 text-lg" onClick={handle}>Send Money</button>
        </div>

    </div>
}