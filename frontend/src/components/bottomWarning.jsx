import { Link } from "react-router-dom";
export const BottomWarning = ({label, to, buttonText}) => {
    return (
        <div className="py-2 flex justify-center text-sm">
           <div>
              {label}
           </div>
           <Link className="pl-1 underline pointer cursor-pointer" to={to}>{buttonText}</Link> 
           
        </div>
    )
}