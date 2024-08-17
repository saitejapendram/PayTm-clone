import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { amountState, balanceAtom, receiverNameState, receiverState } from "../store/atoms"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SendMoney = () => {

    const [amount, setAmount] = useRecoilState(amountState); 
    const [receiver, setReceiver] = useRecoilState(receiverState);
    const [receiverName, setReceiverName] = useRecoilState(receiverNameState); 
    const setBalance = useSetRecoilState(balanceAtom);
    const navigate = useNavigate();

    const handleTransfer = async () => {
        
        try {
            const response = await axios.post("http://127.0.0.1:3000/api/v1/account/transfer", {
                to: receiver,
                amount: amount
            },
            {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
    
            if (response.data.message === "sufficient") {
                setAmount(0);
                setReceiver('');
                setReceiverName('');
                setBalance((e) => !e);
                navigate('/status');
            }
        } catch (e) {
            if (e.response && e.response.data.message === "insufficient") {
                alert("Insufficient Balance");
            } else {
                console.error("Transfer failed:", e);
                alert("Transfer failed. Please try again later.");
            }
        }
    }

    

    return (
        <div className="h-screen bg-white">
            <div className="flex justify-center items-center h-screen">
                <div className="w-80 shadow-lg text-center p-6 rounded border">
                    <div className="font-bold text-2xl mb-16 text-black">
                        Send Money
                    </div>
                    <div className="font-bold text-lg text-black text-start">
                        Name : {receiverName && receiverName.toUpperCase()}
                    </div>
                    <div className="font-normal text-lg text-black text-start">
                        Amount (in Rs)
                    </div>
                    <div className="py-1">
                        <input 
                            type="number" 
                            placeholder="Enter amount" 
                            className="border rounded pl-2 py-1 w-full" 
                            onChange={(e) => setAmount(e.target.value)} 
                            value={amount}
                        />
                    </div>
                    <button 
                        className="font-normal text-white bg-black px-2 py-1 mt-2 rounded text-lg text-center w-full" 
                        onClick={handleTransfer}
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    );
}