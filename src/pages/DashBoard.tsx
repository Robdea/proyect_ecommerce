import { useState } from "react";
import Products from "../features/dashboard/view/Products";
import Categories from "../features/dashboard/view/Categories";
import ProductIcon from "../assets/Icons/ProductIcon";
import NewIcon from "../assets/Icons/NewIcon";
import CategoryIcon from "../assets/Icons/CategoryIcon";
import News from "../features/dashboard/view/News";

export default function DashBoard() {
    const [section, setSection] = useState<"productos" | "categorias" | "novedades" | null>("productos");

    return (
        <div className="flex w-full px-16 my-8 gap-2 ">
            <div className="flex-1 bg-white border-2 rounded-2xl border-gray-200 h-full px-2 py-3">
                <h1 className="text-2xl font-medium">Panel de Gestión</h1>
                <div className="flex flex-col gap-2 mt-2">
                    <button 
                    className={`py-2 px-4 border-1  flex gap-2 rounded-xl text-start border-gray-200  ${section === "productos" ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => setSection("productos")}>
                    <ProductIcon/>    
                    Productos</button>
                    <button 
                    className={`py-2 border-1 flex gap-2  border-gray-200 px-4 text-start rounded-xl ${section === "categorias" ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => setSection("categorias")}>
                    <CategoryIcon/>    
                    Categorías</button>
                    <button 
                    className={`py-2 border-1 flex gap-2  border-gray-200 px-4 text-start rounded-xl ${section === "novedades" ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => setSection("novedades")}>
                        <NewIcon/>
                        Novedades</button>

                </div>
            </div>
            <div className="flex-4 h-full bg-white border-2 rounded-2xl border-gray-200 shadow-2xs px-4 py-3">
                {section === "productos" && <Products />}
                {section === "categorias" && <Categories />}
                {section === "novedades" && <News/>}
            </div>
        </div>
    )
}
