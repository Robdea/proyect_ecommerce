import { Link } from 'react-router'
import { Product } from '../lib/type'
import { useCartStore } from '../features/cart/model/useCartStore';
import { useState } from 'react';

export default function ProductCard({id,name,price, image}:Product) {
  const {addProduct} = useCartStore();
  const baseURL = import.meta.env.VITE_BASE_URL
  const [show, setShow] = useState(false);
  return (
    <div 
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    className='relative flex flex-col gap-3 border-gray-200 border-1 bg-white p-3 rounded-2xl shadow-2xs' id={id}>
        <Link to={`/products/${id}`} className='flex flex-col h-full'>
            <section className='flex-1'>
                <img 
                className='h-48 w-full object-contain'
                src={`${baseURL}${image}`} alt={`Una imagen de ${name}`} />
            </section>
            <section className='flex-1'>
                <p className=''>{name}</p>
                <span className='text-2xl font-medium'>${price}</span>
            </section>
        </Link>
        {show && (
          <button
            className='absolute bg-emerald-400 right-0 py-2 top-2/4 rounded-2xl w-2/3 mt-2 left-1/2 transform -translate-x-1/2 text-white font-medium'
            onClick={() => addProduct({id, name, price, quantity: 1})}
          >
            Agregar
          </button>
        )}
    </div>
  )
}
