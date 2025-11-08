import { useRef, useState } from "react"
import ElipsesIcon from "../../assets/Icons/ElipsesIcon"
import UpdateIcon from "../../assets/Icons/UpdateIcon"
import TrashIcon from "../../assets/Icons/TrashIcon"
import ModalGeneric, { ModalGenericRef } from "./ModalGeneric"

interface OptionsProps {
    handleDelete: () => void
    handleEdit: () => void
    labelText: string
}

export default function Options({handleDelete,handleEdit, labelText}:OptionsProps) {
    const [showModal, setShowModal] = useState(false);

    const [show, setShow] = useState(false);

    const modalRef = useRef<ModalGenericRef>(null);

    function handleShowModal() {
        setShowModal(true)
        modalRef.current?.open();
    }

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
                            onClick={handleShowModal}
                            className="flex w-full text-left px-4 py-2 bg-red-200 rounded-2xl">
                            <TrashIcon/>
                            <span>Eliminar</span>
                        </button>
                    </div>
                )
            }
            {
                showModal && (
                    <ModalGeneric
                        ref={modalRef}
                    >
                        <div
                        onClick={(e) => e.stopPropagation()}
                        className="p-5 bg-white rounded-2xl shadow-md w-1/3 text-center"
                        >
                            <h2 className="text-2xl mb-4">Estas seguro de que quieres eliminar <strong>{labelText}</strong></h2>
                            <div className="flex justify-between ">
                                <button 
                                className="bg-red-500/80 rounded-2xl py-1 px-4"
                                onClick={handleDelete}>Eliminar <strong>{labelText}</strong></button>
                                <button 
                                onClick={() => setShowModal(false)}
                                className="rounded-2xl bg-gray-600/80 text-white/90 py-1 px-4">Cancelar</button>
                            </div>
                        </div>
                    </ModalGeneric>
                )
            }
        </div>
    )
}
