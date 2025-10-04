import { useState } from "react";
import { useProduct } from "../../products/viewmodel/useProduct"
import GenericList from "../../../components/ui/GenericList";
import GenericForm from "../../../components/ui/GenericForm";
import { CreateProduct } from "../../../lib/type";
import { useCategory } from "../../category/viewmodel/useCategory";


export default function Products() {
    const {
        createProduct,
        deleteProduct,
        isCreating,
        isLoading,
        error,
        products
    } = useProduct();
    const {categories} = useCategory();

    const handleDelete = (id: string) => {
        deleteProduct({id})
    }
        console.log();
    
    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("message");
        setShow(false)
        createProduct(productData)
    }
    
    const [productData, setProductData] = useState<CreateProduct>({
        name: "",
        category_id: "",
        description: "",
        price: 0,
        stock: 0,
        image: {} as File
    });
    const [show, setShow] = useState(false)

    return (
        <div>
            {isLoading ? <div>Cargando...</div> : (
            <GenericList 
                items={products || []}
                getKey={(p) => p.id}
                renderItem={(cat) => (
                    <>
                        <h2 className="text-xl font-bold">{cat.name}</h2>
                        <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
                    </>
                )}
                />
            )}
            {error && <div>Error al cargar las categorias</div>}
            
            <div>
                <button onClick={() => setShow(prev=> !prev )}>Crear</button>
                {show && (
                    <div 
                    className="absolute">
                        <GenericForm
                            handleSubmit={handleCreate}
                            isLoading={isCreating}
                            textBttn="Crear categoria"                        
                        >
                           <input 
                            value={productData.name}
                            onChange={(e) => setProductData({...productData, name: e.target.value})}
                            placeholder="Nombre" type="text" />
                           <input 
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]){
                                        setProductData({...productData, image: e.target.files[0]})
                                    }
                                }} 
                           />
                           <input 
                            value={productData.description}
                            onChange={(e) => setProductData({...productData, description: e.target.value})}
                           placeholder="Description" type="text" />
                           <input 
                            value={productData.price}
                            onChange={(e) => setProductData({...productData, price: Number(e.target.value)})}
                           placeholder="precio" type="number" />
                           <select name="" id="">
                            <option value="">Seleccione una categoria</option>
                            {categories?.map((cat) => (
                                <option 
                                    key={cat.id} 
                                    value={cat.id}
                                    onClick={() => setProductData({...productData, category_id: cat.id})}
                                >
                                    {cat.name}
                                </option>
                            ))}
                           </select>
                           <input 
                            value={productData.stock}
                            onChange={(e) => setProductData({...productData, stock: Number(e.target.value)})}
                            placeholder="cantidad" type="number" />
                            
                        </GenericForm>
                    </div>
                )}
            </div>
        </div>
    )
}
