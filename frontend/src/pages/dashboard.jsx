import { useEffect, useState } from "react"
import { AppBar } from "../components/appBar"
import { Balance } from "../components/balance"
import { Users } from "../components/users"
import axios from "axios";

export const Dashboard = () => {
    const [firstName, setfirstName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://127.0.0.1:3000/api/v1/user/user", {
                headers : {
                    'Authorization' : "Bearer "+ localStorage.getItem("token")
                }
            })
            setfirstName(response.data.user.firstName);

        } 
        fetchUser();

    },[])
    
    return (
        <div className="">
            <div className="mb-16"><AppBar firstName={firstName}/></div>
            <Balance />
            <Users />
        </div>
    )
}