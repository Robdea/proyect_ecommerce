import { Category } from "../lib/type";

export default function CategoryCard({id,name, image}:Category) {

    const baseURL = import.meta.env.VITE_BASE_URL

    return (
        <div id={id} className="p-4 flex flex-col gap-3 items-center border-gray-200 border-1 bg-white rounded-2xl shadow-2xs hover:shadow-lg transition-shadow">
            <div className="rounded-full shadow hover:shadow-lg transition-shadow p-1">
                <img 
                className="w-40 h-40 object-contain rounded-full"
                src={`${baseURL}${image}`} alt={`Imagen de ${name}`} />
            </div>
            <h3>{name}</h3>
        </div>
    )
}
