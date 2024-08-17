import { useRecoilValue } from "recoil"

import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
    
    const [balance, setBalance] = useState(0);
    const [balanceB, setBalanceB] = useState(false);

    useEffect(() => {
        const fetchBalance = async () => {
            const response = await axios.get(`http://127.0.0.1:3000/api/v1/account/balance`,
                {
                    headers : {
                    'Authorization' : "Bearer " + localStorage.getItem("token")
                }
            }
            );
            setBalanceB(true);
            setBalance(response.data.balance);

        }
        fetchBalance();

    })
    return (
        <div className="flex ml-4 items-center">
            <div className="text-lg font-bold">
               Your balance 
            </div>
            <div className="text-lg ml-4 p-2 font-semibold">
                {balanceB && balance.toFixed(2)}
            </div>
        </div>
    )
}