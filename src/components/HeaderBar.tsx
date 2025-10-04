import { Link } from "react-router-dom";
import CartBttn from "./CartBttn";

export default function HeaderBar() {
  return (
    <header className="flex p-4 w-full justify-between items-center border-b-1 border-gray-300">
            <h1 className="text-2xl">
                <Link to="/">
                    Ecommerce-practica
                </Link>
            </h1>
            <div className="flex mr-29 gap-10 items-center">
                <div className="border-2 border-gray-400 rounded-2xl pl-2">
                    <input  placeholder="Buscar" type="text" />
                    <button className="bg-gray-300 px-3 py-2 rounded-r-2xl">Buscar</button>
                </div>
                <div className="flex gap-5 items-center ">
                    <div className="border-2 border-gray-400 rounded-2xl px-3 py-2">
                        <Link to="/login">
                            Iniciar Sesion
                        </Link>
                    </div>
                   <CartBttn/>
                </div>
            </div>
    </header>  
    )
}
