import { Link } from "react-router-dom";
import CartBttn from "./CartBttn";
import { useAuthStore } from "../features/auth/model/authStore";
import UserIcon from "../assets/Icons/UserIcon";
import SearchIcon from "../assets/Icons/SearchIcon";
import { useState } from "react";

export default function HeaderBar() {
    const {user} = useAuthStore();

    const [show, setShow] = useState(false);

    return (
        <header className="flex p-4 w-full justify-between items-center border-b-1 border-gray-300">
                <h1 className="text-2xl">
                    <Link to="/">
                        Ecommerce-practica
                    </Link>
                </h1>
                <div className="flex mr-29 gap-10 items-center">
                    <div className="border-2 h-10 flex items-center border-gray-400 rounded-2xl pl-2">
                        <input className=" h-full"  placeholder="Buscar" type="text" />
                        <button className="bg-gray-300 rounded-r-2xl h-full p-2"><SearchIcon/></button>
                    </div>

                    <div className="flex gap-5 items-center ">
                        {
                            user ? (
                                <div className="relative">
                                    <button onClick={() => setShow(!show)}>
                                        <UserIcon/>
                                        {user.name}
                                    </button>
                                    {
                                        show && (
                                            <div className="absolute z-100 bg-white -right-2 px-3 py-2 rounded-xl border-1 border-gray-200">
                                                <nav className="flex flex-col w-45">
                                                    {
                                                        user.role === "admin" && (
                                                            <Link 
                                                            className="hover:bg-gray-100/80 px-2 py-1 rounded-xl"
                                                            to={"/dashboard"}>Panel administractivo</Link>
                                                        )
                                                    }
                                                    <Link 
                                                    className="hover:bg-gray-100/80 px-2 py-1 rounded-xl"
                                                    to={"/history"}>Historial de compras</Link>
                                                </nav>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="border-2 border-gray-400 rounded-2xl px-3 py-2">
                                    <Link to="/login">
                                        Iniciar Sesion
                                    </Link>
                                </div>
                            )
                        }
                        <CartBttn/>
                    </div>
                </div>
        </header>  
    )
}
