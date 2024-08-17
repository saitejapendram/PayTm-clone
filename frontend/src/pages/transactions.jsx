import axios from "axios"
import { useEffect, useState } from "react"
import { TransactionCard } from "../components/transactionCard";
import { useRecoilValue } from "recoil";
import { senderIdAtom } from "../store/atoms";
import { useNavigate } from "react-router-dom";

export const Transactions = () => {
    const [transactionsS, setTransactionsS] = useState([]);
    const senderIdV = useRecoilValue(senderIdAtom);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTransaction = async () => {
            const res = await axios.get(`http://127.0.0.1:3000/api/v1/account/transactions?senderId=${senderIdV}`,
                {
                    headers : {
                        'Authorization' : "Bearer " + localStorage.getItem('token')
                    }
                }
            )
            setTransactionsS(res.data.transactions);
        }
        fetchTransaction();

    },[])
    return (
        <div>
            <button className="border rounded px-2 mx-12 font-bold text-white py-1 text-xl mt-8 mb-4 bg-black" onClick={() => navigate("/dashboard")}>Dashboard</button>
            <div>
                <div className="flex grid grid-cols-4 mx-12 space-y-2 border rounded flex justify-center items-center mr-12 pr-4 my-1 py-2 px-2 font-bold text-xl text-black bg-slate-200">
                <div>Sender</div>
                <div>Receiver</div>
                <div>Amount</div>
                <div>Status</div>
            </div>
            {
                transactionsS && transactionsS.map((transaction) => (
                    <TransactionCard senderId={transaction.senderName} receiverId={transaction.receiverName} amount={transaction.amount} status={transaction.status}/>
                ))
            }
        </div>
        </div>
    )
}