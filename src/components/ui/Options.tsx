import { useState } from "react"
import ElipsesIcon from "../../assets/Icons/ElipsesIcon"
import UpdateIcon from "../../assets/Icons/UpdateIcon"
import TrashIcon from "../../assets/Icons/TrashIcon"

interface OptionsProps {
    handleDelete: () => void
    handleEdit: () => void
}

export default function Options({handleDelete,handleEdit}:OptionsProps) {
    const [show, setShow] = useState(false)
    return (
        <div className="relative">
            <button onClick={() => setShow(!show)} className="p-2 rounded-full hover:bg-gray-200">
                <ElipsesIcon/>
            </button>
            {
                show && (
                    <div className="absolute bg-white border-2 border-gray-100 shadow-md rounded-2xl p-2 z-50">
                        <button 
                            onClick={handleEdit}
                            className="flex w-full text-left px-4 py-2 bg-blue-100 rounded-2xl mb-2">
                            <UpdateIcon/>
                            <span>Actualizar</span>
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="flex w-full text-left px-4 py-2 bg-red-200 rounded-2xl">
                            <TrashIcon/>
                            <span>Eliminar</span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}
