import CartIcon from "../assets/Icons/CartIcon";
import CartPage from "../features/cart/view/CartPage"
import { useState } from "react"

export default function CartBttn() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
        <button 
        className="border-2 border-gray-400 p-2 rounded-full"
        onClick={() =>setShowCart((prev)=> prev= !prev)}>
          <CartIcon/>
        </button>
        { showCart&& (
          <div 
          onClick={() => setShowCart(false)}
          className="absolute z-30 flex bg-gray-900/40 justify-end flexbg-amber-400 h-full top-0 w-full right-0 left-0 ">
            <div 
            onClick={(e) => e.stopPropagation()}
            className="w-1/3 h-full bg-white p-4 z-100">
              <CartPage/>
            </div>
          </div>
        )}
    </div>
  )
}
