import ProductCard from "../../../components/ProductCard"
import { useProduct } from "../viewmodel/useProduct"

export default function ProductPage() {
    const {products,isLoading} = useProduct()

    if (isLoading) return <div>Cargando</div>

    return (
        <div className="px-5 my-2">
            <div>
            <h2 className="text-2xl">Productos</h2>    
            </div>
            <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
            >
                {products && products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
}
