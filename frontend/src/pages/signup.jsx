import { BottomWarning } from "../components/bottomWarning"
import { Button } from "../components/button"
import { Heading } from "../components/heading"
import { SubHeading } from "../components/subHeading"
import { InputBox } from "../components/inputBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async () => {
        
        try {
            const response = await axios.post("http://127.0.0.1:3000/api/v1/user/signup", {
                firstName,
                lastName,
                username,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    
            if (!response.data.token) {
                alert("Error during signup");
            } else {
                setFirstName("");
                setLastName("");
                setUsername("");
                setPassword("");
                navigate("/signin");
            }
        } catch (error) {
            
            alert("An error occurred. Please try again later.");
        }
    };

    return (<div className="bg-slate-300 flex justify-center h-screen">
        <div className="flex flex-col justify-center ">
            <div className="w-80 h-max bg-white rounded-lg text-center p-2 px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox label={"First Name"} placeholder="Stephen" onChange={(e) => setFirstName(e.target.value)}/>
                <InputBox label={"Last Name"} placeholder="Curry" onChange={(e) => setLastName(e.target.value)}/>
                <InputBox label={"Email"} placeholder="Curry@gmail.com" onChange={(e) => setUsername(e.target.value)}/>
                <InputBox label={"Password"} placeholder="12345" onChange={(e) => setPassword(e.target.value)}/>
                <Button label={"Sign up"} onClick={handleSubmit}/>
                <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"}/>
            </div>
        </div>
    </div>    
    )
}