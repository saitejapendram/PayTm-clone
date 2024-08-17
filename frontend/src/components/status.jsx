import { useNavigate } from "react-router-dom";

export const Status = () => {
    const navigate = useNavigate()

    return (
        <div className="h-screen">
            <div className="flex flex-col justify-center items-center h-full">
                <div className="border rounded shadow-lg px-12 py-12 text-3xl font-bold text-black">
                      Transaction Successful 
                </div>
                <div className="mt-12">
                      <button className="border shadow-lg px-4 py-1 font-semibold text-2xl text-black rounded" onClick={() => navigate("/dashboard")}>Dashboard</button>
                </div>
            </div>
        </div>
    )
}