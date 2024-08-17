export const TransactionCard = ({
    senderId,
    receiverId,
    amount,
    status
}) => {
    return (
        <div className="flex grid grid-cols-4 mx-12 space-y-2 border rounded flex justify-center items-center mr-12 pr-4 my-1 py-2 px-2 font-bold text-lg text-black bg-slate-200">
            <div>{senderId && senderId.toUpperCase()}</div>
            <div>{receiverId && receiverId.toUpperCase()}</div>
            <div>{amount}</div>
            <div className="">{status}</div>
        </div>
    )
}