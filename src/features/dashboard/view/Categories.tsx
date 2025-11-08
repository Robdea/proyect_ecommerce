import { useRef, useState } from "react"
import { useCategory } from "../../category/viewmodel/useCategory"
import GenericList from "../../../components/ui/GenericList"
import GenericForm from "../../../components/ui/GenericForm"
import { Category, CreateCategory, UpdateCategory } from "../../../lib/type"
import Options from "../../../components/ui/Options"
import ModalGeneric, { ModalGenericRef } from "../../../components/ui/ModalGeneric"
import SelectImg from "../../../components/SelectImg"
import FloatElement from "../../../components/ui/FloatElement"
import Input from "../../../components/Input"
import GenericCard from "../../../components/ui/GenericCard"

export default function Categories() {
  const {
    categories,createCategory,
    deleteCategory,error,isCreating,
    isLoading,
    updateCategory,
    isPatchPending
    } = useCategory()
  
    const handleDelete = (id: string) => {
        deleteCategory({id})
    }

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setShow(false)
        createCategory(categoryData);
        setCategoryData({
            name: "", 
            description: "",
            image: {} as File
        })
    }

    const [categoryData, setCategoryData] = useState<CreateCategory>(
        {
            name: "", 
            description: "",
            image: {} as File
        }
    );
    const [updateData, setUpdateData] = useState<UpdateCategory>({
        id:"",
        name: "",
        description: "",
        image: {} as File,
    });
    
    // const {setCategory, selectedCategory} = useDashStore()
    
    function handleUpdate(cate: Category) {
        // setCategory(cate);
       
        setShowModal(true);
        setUpdateData({
            id: cate.id,
            name: cate.name,
            description: cate.description,
            image: {} as File,
        });

        modalRef.current?.open();
       
    }

    function handlePatch(e: React.FormEvent) {
        e.preventDefault();
        updateCategory(updateData);
    }

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<ModalGenericRef>(null);

    return (
        <div>
            <div className="flex flex-col items-center gap-3">
                <FloatElement
                    setShow={setShow}
                    show={show}
                    textBttn="Crear nueva categoría"
                >
                    <GenericForm
                        className="w-full min-h-93 p-4 shadow-md flex flex-col gap-2"
                        handleSubmit={handleCreate}
                        isLoading={isCreating}
                        textBttn="Crear categoria">
                        
                        <Input
                        idHtml="name"
                        labelText="Nombre de la categoría"
                        value={categoryData.name}
                        onChange={(val) => setCategoryData({...categoryData, name: val})}
                        placeholder="ej: teclado..."
                        />
                        <Input
                        idHtml="description"
                        labelText="Descripción"
                        value={categoryData.description}
                        onChange={(val) => setCategoryData({...categoryData, description: val})}
                        placeholder="ej: teclado..."
                        isTextArea={true}
                        />
                        <label className="font-medium">Imagen</label>
                        <SelectImg
                            onChange={(file) => setCategoryData({ ...categoryData, image: file })}
                        />
                    </GenericForm>
                </FloatElement>
                {isLoading ? <div>Cargando...</div> : (
                    <div className="w-full flex flex-wrap gap-4">
                        <GenericList
                        items={categories || []}
                        getKey={(cat) => cat.id}
                        renderItem={(cat) => (
                            <GenericCard
                            img={cat.image}
                            name={cat.name}
                            >
                                <Options
                                    labelText="categoria"
                                    handleDelete={() => handleDelete(cat.id)}
                                    handleEdit={() => handleUpdate(cat)}
                                />
                            </GenericCard>
                        )}
                        />
                    </div>
                )}
                {error && <div>Error al cargar las categorias</div>}
            </div>
            {
                showModal && (        
                <ModalGeneric ref={modalRef}>
                    <div 
                    onClick={(e) => e.stopPropagation()}
                    className="p-5 bg-white rounded-2xl shadow-md w-1/3">
                        <GenericForm
                        isLoading={isPatchPending}
                        handleSubmit={handlePatch}
                        textBttn="Actualizar categoría"                    
                        >
                        <h1 className="text-3xl">Actualizar</h1>
                        <label 
                            className="font-medium"
                            htmlFor="name">Nombre de la categoría</label>
                            <input 
                                id="name"
                                className="border p-2 rounded-2xl border-gray-200"
                                value={updateData.name}
                                onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                placeholder="ej: teclado..."
                                type="text" 
                            />
                            <label 
                            className="font-medium"
                            htmlFor="description">Descripción</label>
                            <textarea 
                                className="border p-2 rounded-2xl border-gray-200"
                                placeholder="ej: Teclado mecánico RGB..."
                                id="description"
                                value={updateData.description}
                                
                                onChange={(e) => setUpdateData({...updateData, description: e.target.value})}
                            ></textarea>
                        </GenericForm>
                    </div>
                </ModalGeneric>
                )
            }
        </div>
    )
}
