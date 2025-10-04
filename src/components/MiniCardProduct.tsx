import { Link } from "react-router-dom";
import { CartItem } from "../lib/type";
import BttnsConrtrols from "./ui/BttnsConrtrols";

export default function MiniCardProduct({id,name,price,quantity}: CartItem) {
  return (
    <div className="border-1 border-gray-200 flex shadow-2xs justify-between px-4 py-2.5 rounded-2xl" id={id}>
        <Link to={`products/${id}`}>
            <div>
                <p>{name}</p>
            </div>
        </Link>
        <div className="flex flex-col items-end">
            <span>$ {price}</span>
            <BttnsConrtrols 
            quantity={quantity}/>
        </div>
    </div>
  )
}
