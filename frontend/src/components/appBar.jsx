import { useNavigate } from "react-router-dom";
export const AppBar = ({firstName}) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.removeItem("token");
        navigate("/signin");

    }
    return (
        <div className="">
        <div className="fixed top-0 left-0 w-full z-10 shadow h-14 flex justify-between font-semibold border-b border-black bg-slate-200">
            <div className="flex flex-col font-bold text-2xl h-full justify-center ml-4">
                PayTM App
            </div> 
            <div className="flex justify-center items-center mr-4">
                <button onClick={() => navigate("/transactions")} className="px-2 border rounded border-black px-2 py-1 text-white bg-black mr-2">Transactions</button>
                <div className="flex font-semibold text-xl mr-4">
                    Hello
                </div>
                <div className="rounded-full h-6 w-6 font-bold text-xl bg-slate-200 ">
                    
                           {firstName[0] && firstName[0].toUpperCase()}
                    
                </div>
                <div className="">
                    <button>{firstName !== '' ? <div onClick={handleClick} className="border px-2 ml-2 py-1 rounded bg-black font-normal text-lg text-white py-1">Sign out</div> : <div></div>}</button>
                </div>
            </div>
        </div>
        </div>
    )
}