import MiniCardProduct from "../../../components/MiniCardProduct";
import { useCartStore } from "../model/useCartStore";

export default function CartPage() {
    const {products} = useCartStore();
  
    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium">Carrito de compras</h1>
            <div className="my-2 h-130 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                    {products.map((item) => (
                    <MiniCardProduct
                        key={item.id}
                        {...item}
                    />
                    ))}
                </div>
            </div>

            <button className="bg-blue-400 py-3 mx-5 rounded-2xl">Comprar</button>
        </div>
    )
}
