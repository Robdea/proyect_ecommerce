import { useRef, useState } from "react";
import { useProduct } from "../../products/viewmodel/useProduct"
import GenericList from "../../../components/ui/GenericList";
import GenericForm from "../../../components/ui/GenericForm";
import { CreateProduct, Product, UpdateProduct } from "../../../lib/type";
import { useCategory } from "../../category/viewmodel/useCategory";
import FloatElement from "../../../components/ui/FloatElement";
import Input from "../../../components/Input";
import SelectImg from "../../../components/SelectImg";
import GenericCard from "../../../components/ui/GenericCard";
import Options from "../../../components/ui/Options";
import ModalGeneric, { ModalGenericRef } from "../../../components/ui/ModalGeneric";


export default function Products() {
    const {
        createProduct,
        deleteProduct,
        isCreating,
        isLoading,
        error,
        products,
        updateProduct,
        isLoadingUpdate
    } = useProduct();

    const {categories} = useCategory();

    const handleDelete = (id: string) => {
        deleteProduct({id})
    }
    
    const [productData, setProductData] = useState<CreateProduct>({
        name: "",
        category_id: "",
        description: "",
        price: 0,
        stock: 0,
        image: {} as File
    });

    const [updateData, setUpdateData] = useState<UpdateProduct>({
        id:"",
        name: "",
        category_id: "",
        price: 0,
        stock: 0,
        description: "",
        image: {} as File,
    });


    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setShow(false)
        createProduct(productData)   
    }

    function handleUpdate(product: Product) {
        console.log(product);
        setShowModal(true);
        setUpdateData({
            id: product.id,
            description: product.description,
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: {} as File,
        });

        modalRef.current?.open();
       
    }

    function handlePatch(e: React.FormEvent) {
        e.preventDefault();
        updateProduct(updateData);
    }
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<ModalGenericRef>(null);

    const [show, setShow] = useState(false)

    return (
        <div>
            <FloatElement
                textBttn="Crear nuevo producto"    
                setShow={setShow}
                show={show}            
            >
                <GenericForm
                    handleSubmit={handleCreate}
                    isLoading={isCreating}
                    textBttn="Crear producto" 
                    className="w-full min-h-93 p-4 shadow-md flex flex-col gap-2"   
                >
                    <Input
                    value={productData.name}
                    idHtml="name"
                    labelText="Nombre del producto"
                    onChange={(val) => setProductData({...productData, name: val})}
                    placeholder="ej. mouse lsx..."
                    />
                    <Input
                        isTextArea={true}
                        idHtml="description"
                        labelText="ej. este producto..."
                        value={productData.description}
                        onChange={(val) => setProductData({...productData, description: val})}
                        placeholder="Des.."
                    />
                    <Input
                        value={productData.price}
                        onChange={(val) => setProductData({...productData, price: Number(val)})}
                        type="number"
                        idHtml="price"
                        labelText="Precio del producto"
                        placeholder="ej. 100"                                
                    />
                    <Input
                        value={productData.stock}
                        onChange={(val) => setProductData({...productData, stock: Number(val)})}
                        type="number"
                        idHtml="stock"
                        labelText="Stock del producto"
                        placeholder="ej. 10"   
                    />
                    <select 
                        name="category" 
                        id="category"
                        onChange={(e) => setProductData({...productData, category_id: e.target.value})}
                        value={productData.category_id}
                    >
                        <option value="">Seleccione una categoria</option>
                        {categories?.map((cat) => (
                            <option 
                                key={cat.id} 
                                value={cat.id}
                            >
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <SelectImg
                        onChange={(file) => setProductData({...productData, image: file})}
                    />
                </GenericForm>
            </FloatElement>
            {isLoading ? <div>Cargando...</div> : (
                <div className="w-full flex flex-wrap gap-4">
                    <GenericList 
                        items={products || []}
                        getKey={(p) => p.id}
                        renderItem={(product) => (
                            <GenericCard
                                img={product.image}
                                name={product.name}
                            >
                                <Options
                                handleDelete={() => handleDelete(product.id)}
                                handleEdit={() => handleUpdate(product)}
                                labelText={`${product.name}`}
                                />
                            </GenericCard>
                        )}
                        />
                </div>
            )}
            {error && <div>Error al cargar las categorias</div>}
            {
                showModal && (        
                <ModalGeneric ref={modalRef}>
                    <div 
                    onClick={(e) => e.stopPropagation()}
                    className="p-5 bg-white rounded-2xl shadow-md w-1/3">
                        <GenericForm
                        isLoading={isLoadingUpdate}
                        handleSubmit={handlePatch}
                        textBttn="Actualizar producto"                    
                        >
                            <h1 className="text-3xl">Actualizar</h1>
                            <Input
                            value={updateData.name}
                            idHtml="name"
                            labelText="Nombre del producto"
                            onChange={(val) => setUpdateData({...updateData, name: val})}
                            placeholder="ej. mouse lsx..."
                            />
                            <Input
                                isTextArea={true}
                                idHtml="description"
                                labelText="ej. este producto..."
                                value={updateData.description}
                                onChange={(val) => setUpdateData({...updateData, description: val})}
                                placeholder="Des.."
                            />
                            <Input
                                value={updateData.price}
                                onChange={(val) => setUpdateData({...updateData, price: Number(val)})}
                                type="number"
                                idHtml="price"
                                labelText="Precio del producto"
                                placeholder="ej. 100"                                
                            />
                            <Input
                                value={updateData.stock}
                                onChange={(val) => setUpdateData({...updateData, stock: Number(val)})}
                                type="number"
                                idHtml="stock"
                                labelText="Stock del producto"
                                placeholder="ej. 10"   
                            />
                            <select 
                                name="category" 
                                id="category"
                                onChange={(e) => setUpdateData({...updateData, category_id: e.target.value})}
                                value={updateData.category_id}
                            >
                                <option value="">Seleccione una categoria</option>
                                {categories?.map((cat) => (
                                    <option 
                                        key={cat.id} 
                                        value={cat.id}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </GenericForm>
                    </div>
                </ModalGeneric>
                )
            }
        </div>
    )
}
