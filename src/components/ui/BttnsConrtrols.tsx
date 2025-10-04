import React from 'react'
import MinusIcon from '../../assets/Icons/MinusIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';

interface BttnsConrtrolsProps {
    quantity?: number;
    handleAdd?: () => void;
    handleRemove?: () => void;
}

export default function BttnsConrtrols({handleAdd,handleRemove,quantity}:BttnsConrtrolsProps) {
  return (
    <div className='flex items-center gap-2 border-1 border-gray-300 rounded-2xl p-1 mt-1'>
        <button
        onClick={handleRemove}
        >
            <MinusIcon/>
        </button>
        <span>{quantity}</span>
        <button
        onClick={handleAdd}
        >
            <PlusIcon/>         
        </button>
    </div>
  )
}
