import { useState } from "react";
import Products from "../features/dashboard/view/Products";
import Categories from "../features/dashboard/view/Categories";

export default function DashBoard() {
    const [section, setSection] = useState<"productos" | "categorias" | "novedades" | null>("productos");

    return (
        <div className="flex flex-col items-center">
            <div className="w-11/12 my-8 bg-white border-2 border-gray-200 shadow-2xs px-4 py-3 rounded-2xl">
                <h1 className="text-3xl font-medium">Panel de Gestión</h1>
                <div className="border-2 border-gray-200 pb-2 rounded-2xl mt-3">
                    <div className="mb-4 flex">
                        <button 
                        className={`py-2 px-4 rounded-tl-2xl  border-b-2 border-r-2 border-gray-200  ${section === "productos" ? "bg-gray-100 font-semibold" : ""}`}
                        onClick={() => setSection("productos")}>Productos</button>
                        <button 
                        className={`py-2 border-b-2 border-r-2 border-gray-200 px-4 ${section === "categorias" ? "bg-gray-100 font-semibold" : ""}`}
                        onClick={() => setSection("categorias")}>Categorías</button>
                        <button 
                        className={`py-2 border-b-2 border-r-2 rounded-br-2xl border-gray-200 px-4 ${section === "novedades" ? "bg-gray-100 font-semibold" : ""}`}
                        onClick={() => setSection("novedades")}>Novedades</button>
                    </div>
                    <div>
                        {section === "productos" && <Products />}
                        {section === "categorias" && <Categories />}
                        {section === "novedades" && <div><h2>Novedades</h2><p>Sección en construcción...</p></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
