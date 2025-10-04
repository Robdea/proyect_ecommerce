import { useParams } from "react-router"
import { useProductQuery, useProductsByCategoryQuery } from "../viewmodel/useProductById";
import ProductCard from "../../../components/ProductCard";
import CartIcon from "../../../assets/Icons/CartIcon";

export default function ProductDetails() {
    const {id} = useParams();

    const {isLoading,product} = useProductQuery(id ?? "");
    const baseURL = import.meta.env.VITE_BASE_URL
    const categoryId = product?.category?.id ?? '';
    console.log("categoryId", categoryId);

    const { products, isLoadingCactegories } = useProductsByCategoryQuery(categoryId);
    
    console.log("productos", products);
    return (
        <div className="h-full flex gap-5 flex-col items-center px-5">
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <div className="flex bg-white px-10 py-5 w-full border-gray-200 border-1 shadow-2xs">
                    <div className="flex-1 flex items-center justify-center">
                        <img className="w-3/4 h-auto" src={`${baseURL}${product?.image}`} alt={`Imagen de ${product?.name}`} />
                    </div>
                    <div className="flex-1 pt-10">
                        <p className="mb-4 font-medium text-2xl">{product?.name}</p>
                        <span className="text-5xl font-medium">$ {product?.price}</span>
                        <p>{product?.description}</p>
                        <div>
                            <button className="bg-emerald-400 px-4 py-2 rounded-2xl flex gap-2 text-2xl items-center mt-5 mb-2">
                                <CartIcon/>
                                Agregar al carrito
                            </button>
                            <span>
                                Disponibles: {product?.stock}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex gap-3 overflow-x-auto">
                {isLoadingCactegories ? <p>Cargando..</p> : (
                    products?.map((p) => (
                        <ProductCard
                            key={p.id}
                            {...p}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
