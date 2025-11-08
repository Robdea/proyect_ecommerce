import { useState } from "react";
import PlusIcon from "../../assets/Icons/PlusIcon"

interface Props {
    children: React.ReactNode,
    textBttn: string
    show?: boolean; // opcional: si el padre quiere controlarlo
    setShow?: (show: boolean) => void; // opcional
}

export default function FloatElement({ children, textBttn, show: showProp, setShow: setShowProp }: Props) {
    const [internalShow, setInternalShow] = useState(false);
    
    const show = showProp ?? internalShow;
    const setShow = setShowProp ?? setInternalShow;
  return (
    <div className="flex items-start w-full relative font-medium">
        <button 
        className="bg-blue-400 px-4 rounded-2xl py-2 flex gap-3 mb-3 text-gray-800"
        onClick={() => setShow(!show)}>
            <PlusIcon/>
            {textBttn}
        </button>
        {
            show && (
                <div
                className="bg-white border-3 border-gray-100 overflow-y-scroll rounded-2xl absolute w-1/3 min-w-2xs z-200 h-full min-h-93 left-0 top-full"
                >
                    {children}
                </div>
            )
        }
    </div>
  )
}
