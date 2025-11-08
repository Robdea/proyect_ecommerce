import { Link } from "react-router-dom";
import { CartItem } from "../lib/type";
import BttnsConrtrols from "./ui/BttnsConrtrols";
import { useCartStore } from "../features/cart/model/useCartStore";

export default function MiniCardProduct({id,name,price, image,quantity}: CartItem) {
  const {increaseProduct, decreaseProduct } =useCartStore();
  const baseURL = import.meta.env.VITE_BASE_URL

  return (
    <div className="border-1 border-gray-200 flex shadow-2xs justify-between px-4 py-2.5 rounded-2xl" id={id}>
        <Link to={`products/${id}`}>
            <div className="flex items-center gap-2 font-medium">
                <div                   
                className="w-20 h-auto rounded-2xl overflow-hidden"
                >
                  <img 
                  src={`${baseURL}${image}`} alt="" />
                </div>
                <p>{name}</p>
            </div>
        </Link>
        <div className="flex flex-col items-end">
            <span>$ {price}</span>
            <BttnsConrtrols 
            handleAdd={() => increaseProduct(id)}
            handleRemove={() => decreaseProduct(id)}
            quantity={quantity}/>
        </div>
    </div>
  )
}
