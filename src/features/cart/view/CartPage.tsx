import MiniCardProduct from "../../../components/MiniCardProduct";
import Stripe from "../../stripe/view/Stripe";
import { useCartStore } from "../model/useCartStore";
import { useCart } from "../viewmodel/useCart";

export default function CartPage() {
    const products = useCartStore((state) => state.products);
    
    const productIds = products.map((item) => item.id);

    const quantityMap = Object.fromEntries(
        products.map((p) => [p.id, p.quantity])
    )
    const {isError,isLoading,productsData} = useCart(productIds)
    console.log("datos", productsData);
    
    if (isLoading) return <p className="text-center mt-10">Cargando productos...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error al cargar el carrito.</p>;
    const mergedProducts = productsData?.map((item) => ({
        ...item,
        image: typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image),
        quantity: quantityMap[item.id] || 1,
    }));
    
    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium">Carrito de compras</h1>
            <div className="my-2 h-130 overflow-y-scroll">
                <div className="flex flex-col gap-2">    
                    {mergedProducts?.map((item) => (
                    <MiniCardProduct
                        key={item.id}
                        {...item}
                    />
                    ))}
                </div>
            </div>
            <div className="border-1 border-gray-200 rounded-xl py-1 px-4">
                <Stripe/>
            </div>
        </div>
    )
}
