import { Heading } from "../components/heading"
import { SubHeading } from "../components/subHeading";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { BottomWarning } from "../components/bottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { senderIdAtom } from "../store/atoms";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useRecoilState(senderIdAtom);
    
    const navigate = useNavigate();
    

    const handleSubmit = async () => {
        
        try {
            // Prepare the request payload
            const data = JSON.stringify({
                username,
                password
            });

            const response = await axios.post("http://127.0.0.1:3000/api/v1/user/signin", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data.token) {
                alert("Error occurred while signing in");
            } else {
                setUsername("");
                setPassword("");
                setUserId(response.data.userId);
                
                
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center ">
                <div className="w-80 bg-white h-max rounded-lg text-center p-2 px-4">
                   <Heading label={"Sign in"}/>
                   <SubHeading label={"Enter your creaditials to access your account"}/>
                   <InputBox label={"Email"} placeholder={"curry@gmail.com"} onChange={(e) => setUsername(e.target.value)}/>
                   <InputBox label={"Password"} placeholder={"12345"} onChange={(e) => setPassword(e.target.value)}/>
                   <Button label={"Sign in"} onClick={handleSubmit}/>
                   <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={"Sign Up"}/>
                </div>
            </div>
        </div>
    )
}