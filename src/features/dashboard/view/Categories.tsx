import { useState } from "react"
import { useCategory } from "../../category/viewmodel/useCategory"
import GenericList from "../../../components/ui/GenericList"
import GenericForm from "../../../components/ui/GenericForm"
import { CreateCategory } from "../../../lib/type"
import Options from "../../../components/ui/Options"
import PlusIcon from "../../../assets/Icons/PlusIcon"

export default function Categories() {
  const {
    categories,
    createCategory,
    deleteCategory,
    error,
    isCreating,
    isLoading} = useCategory()
  
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
    const baseURL = import.meta.env.VITE_BASE_URL

    const [show, setShow] = useState(false)
    return (
        <div className="p-4">
            <div className="flex flex-col items-center p-4 gap-3">
                <div className="flex items-start w-full relative">
                    <button className="bg-blue-400 px-4 rounded-2xl py-2 flex gap-3" onClick={() => setShow(prev=> !prev )}>
                        <PlusIcon/>
                        Crear nueva categoría
                    </button>
                        {show && (
                            <div 
                            className="absolute z-200 left-0 top-full">
                                <GenericForm
                                    className="bg-white border-1 border-gray-100 p-4 rounded shadow-md flex flex-col gap-2"
                                    handleSubmit={handleCreate}
                                    isLoading={isCreating}
                                    textBttn="Crear categoria"                        
                                >
                                    <label 
                                    className="font-medium"
                                    htmlFor="name">Nombre de la categoría</label>
                                    <input 
                                        id="name"
                                        className="border p-2 rounded-2xl border-gray-200"
                                        value={categoryData.name}
                                        onChange={(e) => setCategoryData({...categoryData, name: e.target.value})}
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
                                        value={categoryData.description}
                                        onChange={(e) => setCategoryData({...categoryData, description: e.target.value})}
                                    ></textarea>
                                    <label
                                        className="font-medium"
                                    >Imagen</label>
                                    <input 
                                        id="descriptio"
                                        placeholder="imagen"
                                        className="border p-2 rounded-2xl border-gray-200"
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                            setCategoryData({...categoryData, image: e.target.files[0]});
                                            }
                                        }}
                                    />
                                </GenericForm>
                            </div>
                        )}
                </div>   


                {isLoading ? <div>Cargando...</div> : (
                    <div className="w-full flex flex-wrap gap-4">
                        <GenericList
                        items={categories || []}
                        getKey={(cat) => cat.id}
                        renderItem={(cat) => (
                            <div className="relative border-2 w-50 h-full border-gray-200 rounded-2xl p-4 ">
                                <div className="flex flex-col gap-4 items-center">
                                    <img className="w-full h-40 object-cover" src={`${baseURL}${cat.image}`} alt="" />
                                    <p className="font-medium">{cat.name}</p>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <Options
                                        handleDelete={() => handleDelete(cat.id)}
                                        handleEdit={() => handleDelete(cat.id)}
                                    />
                                </div>
                            </div>
                        )}
                        />
                    </div>
                )}
                {error && <div>Error al cargar las categorias</div>}
            </div>
        </div>
    )
}
