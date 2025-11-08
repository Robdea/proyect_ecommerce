import { useAuthStore } from "../../auth/model/authStore";
import { useHistory } from "../viewmodel/useHistory";

export default function History() {
    const {user} = useAuthStore();

    const {history,isLoading} = useHistory(user?.id || "");
    const baseURL = import.meta.env.VITE_BASE_URL


    return (
        <div className="flex flex-col gap-2">
            {
               isLoading ? (
                    <div>Cargando...</div>
                ) : (
                    history?.map((h) => (
                        <div
                        className="border-1 border-gray-200 shadow-2xs rounded-xl py-2 px-3"
                        key={h.id}>
                            {h.created_at}
                            {h.total}
                            <div className="flex flex-wrap border-2  rounded-2xl border-gray-300">
                                {h.items.map((product)=>(
                                    <div className="flex py-2 px-4 items-center" key={product.id}>
                                        <div className="size-30">
                                            <img src={`${baseURL}${product.product.image}`} alt={`Imagen de ${product.product_name}`} />
                                        </div>
                                        <div>
                                            <p> Nombre: 
                                                <strong> {product.product_name}</strong>
                                            </p>
                                            <p>
                                                Precio:
                                                <strong> {product.product_price}</strong>
                                            </p>
                                            <p>Cantidad:
                                                <strong> {product.quantity}</strong>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}
